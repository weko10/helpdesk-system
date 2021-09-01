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
        message: req.flash("message"),
        error: req.flash("error"),
    });
};

exports.postNewTicket = async (req, res) => {
    try {
        const { department_id, priority_level_id, subject, message } = req.body;

        //insert new ticket in database
        const [[[ticket]]] = await Ticket.create({
            attributes: {
                customerId: req.session.userData.id, //established on login
                departmentId: department_id,
                priorityLevelId: priority_level_id,
                channelId: 2,
                statusId: 1,
            },
        });

        // insert initial message in database
        await Ticket.createMessage({
            attributes: {
                ticketId: ticket.ticket_id,
                subject: subject,
                body: message,
                fromAgent: 0,
            },
        });

        res.send({ message: "success" });
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getTicketsTable = async (req, res) => {
    try {
        const [[tickets]] = await Ticket.findAll({
            where: { customerId: req.session.userData.id },
        });

        res.render("support/tickets-table.ejs", {
            pageTitle: "My Tickets",
            isAuth: req.session.isAuth,
            message: req.flash("message"),
            error: req.flash("error"),
            tickets: tickets,
        });
    } catch (err) {
        console.log(err);
    }
};
