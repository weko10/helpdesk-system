const fs = require("fs");
const path = require("path");

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});

exports.accessLogStream = accessLogStream;
