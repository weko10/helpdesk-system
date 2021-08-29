const router = require("express").Router();

const controller = require("../controllers/support");

router.get("/", controller.getHome);

router.get("/new-ticket", controller.getTicketForm);

router.post("/new-ticket", controller.postTicketForm);

module.exports = router;
