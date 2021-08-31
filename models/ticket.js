//responsible for any operation performed on ticket tabel and its lookup tables

const pool = require("../util/database");

const Ticket = {};

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
        if (options.attributes === {})
            throw new Error("Options argrument was not passed any attributes");
        const attributes = options.attributes;

        return pool.execute("CALL insert_or_update_ticket(0, ?, ?, ?, ?, ?, ?, ?)", [
            attributes.customer_id || null,
            attributes.department_id || null,
            attributes.priority_level_id || null,
            attributes.channel_id || null,
            attributes.status_id || null,
            attributes.category_id || null,
            attributes.current_agent_id || null,
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
        if (options.attributes === {})
            throw new Error("Options argrument was not passed any attributes");
        const attributes = options.attributes;

        return pool.execute("CALL insert_ticket_message(?, ?, ?, ?)", [
            attributes.ticket_id || null,
            attributes.subject || null,
            attributes.body || null,
            attributes.from_agent,
        ]);
    } catch (err) {
        res.send(err);
    }
};

module.exports = Ticket;
