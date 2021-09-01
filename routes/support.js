const router = require("express").Router();

const controller = require("../controllers/support");
const auth = require("../middleware/is-auth");

router.get("/support", controller.getHome);

router.get("/dashboard/new-ticket", auth.isAuth, controller.getNewTicketForm);

router.post("/dashboard/new-ticket", auth.isAuth, controller.postNewTicket);

router.get("/dashboard/tickets", auth.isAuth, controller.getTicketsTable);

module.exports = router;
