const router = require("express").Router();

const controller = require("../controllers/support");
const auth = require("../middleware/is-auth");

router.get("/support", controller.getHome);

router.get("/dashboard/new-ticket", auth.isAuth, controller.getNewTicketForm);

router.post("/dashboard/new-ticket", auth.isAuth, controller.postNewTicket);

router.get("/dashboard/tickets", auth.isAuth, controller.getTicketsTable);

router.get("/dashboard/ticket/:id", auth.isAuth, controller.getTicketChat);

router.get("/api/ticket/:id/messages", controller.getTicketMessages);

module.exports = router;
