//controlles operations on tickets made by the customer

const Ticket = require("../models/ticket");

exports.getHome = (req, res) => {
    res.render("support/home.ejs", {
        pageTitle: "Support",
        isAuth: req.session.isAuth,
    });
};

exports.getNewTicketForm = (req, res) => {
    //Ticket form for authenticated users, views as part of dashboard
    res.render("support/dashboard-new-ticket.ejs", {
        pageTitle: "Dashboard-New Ticket",
        isAuth: req.session.isAuth,
        userData: req.session.userData,
    });
};

exports.postNewTicket = async (req, res) => {
    try {
        await Ticket.create({
            attributes: {
                customer_id: req.session.userData.id, //established on login
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
