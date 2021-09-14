const router = require("express").Router();

const controller = require("../controllers/support");
const { check } = require("express-validator");
const auth = require("../middleware/is-auth");

router.get("/support", controller.getHome);

router.get("/dashboard/new-ticket", auth.isAuth, controller.getNewTicketForm);

router.post(
    "/dashboard/new-ticket",
    auth.isAuth,

    //validation logic
    [
        check(
            "department_id",
            "Something is wrong with the chosen department. Please try again!"
        ).isIn(["1", "2", "3"]),
        check(
            "priority_level_id",
            "Something is wrong with the chosen priority. Please try again!"
        ).isIn(["1", "2", "3"]),
        check(
            "subject",
            "Something is wrong with the subject. Please try again!"
        ).isByteLength({ min: 3, max: 255 }),
        check(
            "message",
            "Something is wrong with the message. Please try again!"
        ).isByteLength({ min: 20, max: 1000 }),
    ],

    controller.postNewTicket
);

router.get("/dashboard/tickets", auth.isAuth, controller.getTicketsTable);

router.get("/dashboard/ticket/:id", auth.isAuth, controller.getTicketChat);

module.exports = router;
