const Ticket = require("../../models/ticket");

//api route
exports.getTicketMessages = async (req, res, next) => {
    try {
        const [[messages]] = await Ticket.findTicketMessages({
            where: { ticketId: req.params.id },
        });

        res.setHeader("content-type", "application/json");
        res.send(messages);
    } catch (err) {
        res.send(err);
    }
};
