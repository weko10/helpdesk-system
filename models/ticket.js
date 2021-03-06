//responsible for any operation performed on ticket tabel and its lookup tables

const pool = require("../util/database");

const Ticket = {};

Ticket.findAll = async (options = {}) => {
    //Fetches all tickets by user id
    //Procdure parameters:
    // _user_id INT
    // _ticket_id INT

    try {
        const where = options.where;
        if (where === undefined) {
            throw new Error("where option was not passed");
        }

        const result = await pool.execute("CALL get_all_tickets(?, ?)", [
            where.customerId || 0,
            where.ticketId || null,
        ]);

        return result;
    } catch (err) {
        throw Error("An error occurred in database!", { cause: err });
    }
};

Ticket.create = async (options = {}) => {
    //Inserts a new ticket using procedure
    //Procedure parameters in order:
    // customer_id IS NOT NULL,
    // department_id IS NOT NULL,
    // priority_level_id IS NOT NULL,
    // channel_id IS NOT NULL,
    // status_id DEFAULT NULL,
    // _subject VARCHAR(255),
    // category_id DEFAULT NULL,
    // current_agent_id DEFAULT NULL

    try {
        //validate options param
        const attributes = options.attributes;
        if (attributes === undefined)
            throw new Error("Options argrument was not passed any attributes");

        const result = await pool.execute(
            "CALL insert_or_update_ticket(0, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                attributes.customerId || null,
                attributes.departmentId || null,
                attributes.priorityLevelId || null,
                attributes.channelId || null,
                attributes.statusId || null,
                attributes.subject || null,
                attributes.categoryId || null,
                attributes.currentAgentId || null,
            ]
        );

        return result;
    } catch (err) {
        throw Error("An error occurred in database!", { cause: err });
    }
};

Ticket.createMessage = async (options = {}) => {
    //Inserts new ticket message using procedure
    //Procedure attributes:
    // _ticket_id INT,
    // _body TEXT,
    // _from_agent BOOLEAN

    try {
        //validate options param
        const attributes = options.attributes;
        if (attributes === undefined)
            throw new Error("Options argrument was not passed any attributes");

        const result = await pool.execute("CALL insert_ticket_message(?, ?, ?)", [
            attributes.ticketId || null,
            attributes.body || null,
            attributes.fromAgent,
        ]);

        return result;
    } catch (err) {
        throw Error("An error occurred in database!", { cause: err });
    }
};

Ticket.createMessageAttachment = async (options = {}) => {
    //Inserts ticket message attachment into attachment table
    //Procedure params:
    // _ticket_message_id INT,
    // _attachment_path VARCHAR(255)

    try {
        //validate options param
        const attributes = options.attributes;
        if (attributes === undefined)
            throw new Error("Options argrument was not passed any attributes");

        const result = await pool.execute("CALL insert_attachment(?, ?)", [
            attributes.ticketMessageId,
            attributes.attachmentPath,
        ]);

        return result;
    } catch (err) {
        throw Error("An error occurred in database!", { cause: err });
    }
};

Ticket.findTicketMessages = async (options = {}) => {
    //gets all ticket messages using the ticket id
    //Procedure attributes:
    // _ticket_id INT

    try {
        //validate options param
        const where = options.where;
        if (where === undefined)
            throw new Error("Options argrument was not passed any filters");

        const result = await pool.execute("CALL get_ticket_messages(?)", [
            where.ticketId,
        ]);

        return result;
    } catch (err) {
        throw Error("An error occurred in database!", { cause: err });
    }
};

module.exports = Ticket;
