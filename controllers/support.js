//controlles operations on tickets made by the customer

const Ticket = require("../models/ticket");
const moment = require("moment");
const { noExtendLeft } = require("sequelize/types/lib/operators");

const formatDate = date => {
    return moment(date).format("DD.MM.yyyy (hh:mm)");
};

const formatTicketsDate = ticketsList => {
    for (let i = 0; i < ticketsList.length; i++) {
        const ticket = ticketsList[i];

        ticket.created_at = formatDate(ticket.created_at);
    }
};

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

exports.postNewTicket = async (req, res, next) => {
    try {
        const { department_id, priority_level_id, subject, message } = req.body;

        // insert new ticket in database
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
        const [[[ticketMessage]]] = await Ticket.createMessage({
            attributes: {
                ticketId: ticket.ticket_id,
                subject: subject,
                body: message,
                fromAgent: 0,
            },
        });

        // insert attachment into database
        if (req.file !== undefined) {
            await Ticket.createMessageAttachment({
                attributes: {
                    ticketMessageId: ticketMessage.id,
                    attachmentPath: req.file.path,
                },
            });
        }

        req.flash("message", "Successfully opened new ticket");
        return res.redirect("/dashboard/account");
    } catch (err) {
        next(err);
    }
};

exports.getTicketsTable = async (req, res, next) => {
    try {
        const [[tickets]] = await Ticket.findAll({
            where: { customerId: req.session.userData.id },
        });

        formatTicketsDate(tickets);

        res.render("support/tickets-table.ejs", {
            pageTitle: "My Tickets",
            isAuth: req.session.isAuth,
            message: req.flash("message"),
            error: req.flash("error"),
            tickets: tickets,
        });
    } catch (err) {
        next(err);
    }
};
