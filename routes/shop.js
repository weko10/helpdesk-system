const router = require("express").Router();

const controller = require("../controllers/shop");

router.get("/", controller.getHome);

module.exports = router;
