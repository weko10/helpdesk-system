CREATE DEFINER=`root`@`localhost` FUNCTION `is_user_exist`(
	_id INT,
    _email VARCHAR(64)
) RETURNS int
    DETERMINISTIC
BEGIN
    RETURN (SELECT count(*) FROM `user` u
	WHERE u.id = ifnull(_id, u.id) AND u.email = ifnull(_email, u.email));
END