//controlles operations on tickets made by the customer

exports.getTicketForm = (req, res) => {
    res.render("ticket-form.ejs", { pageTitle: "New Ticket" });
};
