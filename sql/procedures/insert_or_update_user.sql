CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_or_update_user`(
	_id INT,
    _username varchar(64),
    _email varchar(64),
    _password char(60),
    _phone varchar(11),
    _home_address varchar(64)
)
BEGIN
	IF _id <= 0 THEN
		INSERT INTO user (username, email, `password`, phone, home_address)
        VALUES (_username, _email, _password, _phone, _home_address);
	ELSE
		UPDATE user
        SET
			username = IFNULL(_username, username),
			email = IFNULL(_email, email),
			`password` = IFNULL(_password, `password`),
			phone = IFNULL(_phone, phone),
			home_address = IFNULL(_home_address, home_address)
		WHERE
			id = _id AND (_username IS NOT NULL OR
				_email IS NOT NULL OR
                _password IS NOT NULL OR
                _phone IS NOT NULL OR
                _home_address IS NOT NULL);
	END IF;
END