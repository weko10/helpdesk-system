const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const sessionStore = require("./util/session");
const multer = require("multer");
const morgan = require("morgan");
const multerStorage = require("./util/multer").storage;
const multerFileFilter = require("./util/multer").fileFilter;
const flash = require("./util/flash");
const { accessLogStream } = require("./util/logger");

app.set("views", "views");
app.set("template engine", "ejs");

app.listen(
    process.env.PORT || 3000,
    console.log("App is listening on http://localhost:3000/")
);

const supportRouter = require("./routes/support");
const homeRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const ticketApi = require("./routes/api/ticket");
const { notFound, logger, responder } = require("./controllers/error"); //error handlers

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(compression());
app.use(helmet());

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
app.use(flash);

app.use(homeRouter);
app.use(authRouter);
app.use(supportRouter);
app.use("/api", ticketApi);

//test routes
app.get("/message/success", (req, res) => {
    req.flash("message", { success: "horaay" });
    res.redirect("/");
});

app.get("/message/error", (req, res) => {
    req.flash("message", { error: "error" });
    res.redirect("/");
});

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
