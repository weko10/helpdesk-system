const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e5);
        cb(null, file.originalname + "-" + uniqueSuffix + ".png");
    },
});

module.exports = multerStorage;
