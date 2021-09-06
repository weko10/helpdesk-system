const router = require("express").Router();

const controller = require("../controllers/error");

router.use(controller.errorLogger);

router.use(controller.errorResponder);

module.exports = router;
