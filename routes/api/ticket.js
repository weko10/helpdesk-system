const router = require("express").Router();

const controller = require("../../controllers/api/ticket");

router.get("/ticket/:id/messages", controller.getTicketMessages);

module.exports = router;
