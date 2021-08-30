CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_users`(
	_id INT,
    _email VARCHAR(64)
)
BEGIN
    SELECT * FROM `user` u
	WHERE u.id = ifnull(_id, u.id) AND u.email = ifnull(_email, u.email);
END