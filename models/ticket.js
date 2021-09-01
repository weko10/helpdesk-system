//responsible for any operation performed on ticket tabel and its lookup tables

const pool = require("../util/database");

const Ticket = {};

Ticket.findAll = (options = {}) => {
    //Fetches all tickets by user id
    //Procdure parameters:
    // _user_id INT

    try {
        const where = options.where;
        if (where === undefined) {
            throw new Error("where option was not passed");
        }

        return pool.execute("CALL get_all_tickets(?)", [where.customerId || null]);
    } catch (err) {
        console.log(err);
    }
};

Ticket.create = (options = {}) => {
    //Inserts a new ticket using procedure
    //Procedure parameters in order:
    // customer_id IS NOT NULL,
    // department_id IS NOT NULL,
    // priority_level_id IS NOT NULL,
    // channel_id IS NOT NULL,
    // status_id DEFAULT NULL,
    // category_id DEFAULT NULL,
    // current_agent_id DEFAULT NULL

    try {
        //validate options param
        const attributes = options.attributes;
        if (attributes === undefined)
            throw new Error("Options argrument was not passed any attributes");

        return pool.execute("CALL insert_or_update_ticket(0, ?, ?, ?, ?, ?, ?, ?)", [
            attributes.customerId || null,
            attributes.departmentId || null,
            attributes.priorityLevelId || null,
            attributes.channelId || null,
            attributes.statusId || null,
            attributes.categoryId || null,
            attributes.currentAgentId || null,
        ]);
    } catch (err) {
        res.send(err);
    }
};

Ticket.createMessage = (options = {}) => {
    //Inserts new ticket message using procedure
    //Procedure attributes:
    // _ticket_id INT,
    // _subject VARCHAR(255),
    // _body TEXT,
    // _from_agent BOOLEAN

    try {
        //validate options param
        const attributes = options.attributes;
        if (attributes === undefined)
            throw new Error("Options argrument was not passed any attributes");

        return pool.execute("CALL insert_ticket_message(?, ?, ?, ?)", [
            attributes.ticketId || null,
            attributes.subject || null,
            attributes.body || null,
            attributes.fromAgent,
        ]);
    } catch (err) {
        res.send(err);
    }
};

module.exports = Ticket;
