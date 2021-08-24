const express = require("express");
const app = express();

app.set("views", "views");
app.set("template engine", "ejs");

app.listen(3000, console.log("App is listening on http://localhost:3000/"));

const ticketRouter = require("./routes/ticket");

app.use("/support", ticketRouter);
