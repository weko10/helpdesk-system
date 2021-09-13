const router = require("express").Router();

const controller = require("../controllers/auth");
const auth = require("../middleware/is-auth");
const { check } = require("express-validator");

router.get("/auth/signup", controller.getSignup);

router.post(
    "/auth/signup",

    //validation logic
    check("username", "Something is wrong with the username! Please try again.")
        .notEmpty()
        .isString()
        .isAlphanumeric()
        .isByteLength({ min: 3, max: 50 }),
    check("email", "Something is wrong with the email! Please try again.")
        .notEmpty()
        .isString()
        .isEmail(),
    check("password", "Something is wrong with the password! Please try again.")
        .notEmpty()
        .isString()
        .isStrongPassword(),
    check(
        "phone",
        "Something is  wrong with the phone number! Please try again."
    ).isMobilePhone(),
    controller.postSignup
);

router.get("/auth/login", controller.getLogin);

router.post(
    "/auth/login",
    check("email", "Invalid email address").notEmpty().isString().isEmail(),
    check("password", "Invalid password").notEmpty().isString(),
    controller.postLogin
);

router.post("/auth/logout", auth.isAuth, controller.logout);

router.get("/dashboard/account", auth.isAuth, controller.getDashboardAccount);

module.exports = router;
