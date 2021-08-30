//controlles operations on tickets made by the customer

const Ticket = require("../models/ticket");

exports.getHome = (req, res) => {
    res.render("support/home.ejs", {
        pageTitle: "Support",
    });
};

// exports.postTicketForm = async (req, res) => {
//     try {
//         await Ticket.create({
//             attributes: {
//                 customer_id: 1, //this is temporary until sessions are implemented
//                 department_id: req.body.department_id,
//                 priority_level_id: req.body.priority_level_id,
//                 channel_id: 2,
//                 status_id: 1,
//             },
//         });
//         res.send({ message: "success" });
//     } catch (err) {
//         res.send(err);
//     }
// };
