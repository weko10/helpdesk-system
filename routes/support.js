const router = require("express").Router();

const controller = require("../controllers/support");
const auth = require("../middleware/is-auth");

router.get("/support", controller.getHome);

router.get("/dashboard/new-ticket", auth.isAuth, controller.getNewTicketForm);

// router.get("/new-ticket", controller.getTicketForm);

// router.post("/new-ticket", controller.postTicketForm);

module.exports = router;
