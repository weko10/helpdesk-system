const express = require("express");
const app = express();

require("dotenv").config();
const session = require("express-session");
const sessionStore = require("./util/session");
const multer = require("multer");
const multerStorage = require("./util/multer").storage;
const multerFileFilter = require("./util/multer").fileFilter;
const flush = require("connect-flash");

app.set("views", "views");
app.set("template engine", "ejs");

app.listen(process.env.PORT, console.log("App is listening on http://localhost:3000/"));

const supportRouter = require("./routes/support");
const homeRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const ticketApi = require("./routes/api/ticket");
const { notFound, logger, responder } = require("./controllers/error"); //error handlers

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: multerStorage, fileFilter: multerFileFilter }).single("image"));
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);
app.use(flush());

app.use(homeRouter);
app.use(authRouter);
app.use(supportRouter);
app.use("/api", ticketApi);

app.get("/throw", (req, res, next) => {
    try {
        const error = new Error("Async Broken");
        error.statusCode = 500;
        throw error;
    } catch (err) {
        next(err);
    }
});

//custom error handlers
app.use(notFound, logger, responder);
