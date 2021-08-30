const router = require("express").Router();

const controller = require("../controllers/auth");

router.get("/auth/signup", controller.getSignup);

router.post("/auth/signup", controller.postSignup);

router.get("/auth/login", controller.getLogin);

router.get("/dashboard/account", controller.getDashboardAccount);

module.exports = router;
