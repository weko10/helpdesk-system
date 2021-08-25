const router = require("express").Router();

const controller = require("../controllers/ticket");

router.get("/new-ticket", controller.getTicketForm);

router.post("/new-ticket", controller.postTicketForm);

module.exports = router;
