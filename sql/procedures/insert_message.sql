CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_ticket_message`(
	_ticket_id INT,
	_body TEXT,
    _from_agent BOOLEAN
)
BEGIN
	INSERT INTO ticket_message (ticket_id, current_agent_id, body, from_agent)
    VALUES (_ticket_id, _current_agent_id, _body, _from_agent);
END