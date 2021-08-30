const router = require("express").Router();

const controller = require("../controllers/auth");

router.get("/auth/signup", controller.getSignup);

router.post("/auth/signup", controller.postSignup);

router.get("/auth/login", controller.getLogin);

router.post("/auth/login", controller.postLogin);

router.post("/auth/logout", controller.logout);

router.get("/dashboard/account", controller.getDashboardAccount);

module.exports = router;
