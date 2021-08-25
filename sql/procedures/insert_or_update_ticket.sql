CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_or_update_ticket`(
	_ticket_id INT,
	_customer_id INT,
    _department_id INT,
    _priority_level_id INT,
    _channel_id INT,
    _status_id INT,
    _category_id INT,
    _current_agent_id INT
)
BEGIN
	IF _ticket_id <= 0 THEN
		INSERT INTO ticket (customer_id, department_id, priority_level_id, channel_id, status_id, category_id, current_agent_id)
        VALUES (_customer_id, _department_id, _priority_level_id, _channel_id, _status_id, _category_id, current_agent_id);
    ELSE
		UPDATE ticket
        SET
			customer_id = ifnull(_customer_id, customer_id), 
            department_id = ifnull(_department_id, department_id),
            category_id = ifnull(_category_id, category_id),
            current_agent_id = ifnull(_current_agent_id, current_agent_id),
            status_id = ifnull(_status_id, status_id), 
            priority_level_id = ifnull(_priority_level_id, priority_level_id), 
            channel_id = ifnull(_channel_id, channel_id)
		WHERE
			id = _ticket_id AND (
				_customer_id IS NOT NULL OR
				_department_id IS NOT NULL OR
				_category_id IS NOT NULL OR
				_current_agent_id IS NOT NULL OR
				_status_id IS NOT NULL OR
				_priority_level_id IS NOT NULL OR
				_channel_id IS NOT NULL
            );
		END IF;
END