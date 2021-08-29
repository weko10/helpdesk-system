//controlles operations on tickets made by the customer

const Ticket = require("../models/ticket");

exports.getTicketForm = (req, res) => {
    res.render("ticket-form.ejs", { pageTitle: "New Ticket" });
};

exports.postTicketForm = async (req, res) => {
    try {
        await Ticket.create({
            attributes: {
                customer_id: 1, //this is temporary until sessions are implemented
                department_id: req.body.department_id,
                priority_level_id: req.body.priority_level_id,
                channel_id: 2,
                status_id: 1,
            },
        });
        res.send({ message: "success" });
    } catch (err) {
        res.send(err);
    }
};