const router = require("express").Router();

const controller = require("../controllers/ticket");

router.get("/new-ticket", controller.getTicketForm);

module.exports = router;
