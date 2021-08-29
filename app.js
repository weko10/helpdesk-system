const express = require("express");
const app = express();

require("dotenv").config();
const session = require("express-session");
const sessionStore = require("./util/session");

app.set("views", "views");
app.set("template engine", "ejs");

app.listen(3000, console.log("App is listening on http://localhost:3000/"));

const ticketRouter = require("./routes/ticket");
const homeRouter = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

app.use("/", homeRouter);
app.use("/support", ticketRouter);
