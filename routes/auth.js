const router = require("express").Router();

const controller = require("../controllers/auth");

router.get("/dashboard/account", controller.getDashboardAccount);

module.exports = router;
