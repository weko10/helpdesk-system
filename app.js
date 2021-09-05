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

app.listen(3000, console.log("App is listening on http://localhost:3000/"));

const supportRouter = require("./routes/support");
const homeRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

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

app.use("/", homeRouter);
app.use(authRouter);
app.use(supportRouter);
