DROP PROCEDURE IF EXISTS get_all_tickets;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_tickets`(
	_user_id INT,
    _user_email VARCHAR(64)
)
BEGIN
	SELECT
		td.ticket_id,
        td.department,
        tm.`subject`,
        td.status,
        td.priority_level,
        t.created_at
    FROM
		ticket t
	JOIN
		ticket_details td ON t.id = td.ticket_id
	LEFT JOIN
		ticket_message tm ON t.id = tm.ticket_id
	WHERE
		t.customer_id = ifnull(_user_id, t.customer_id);
END