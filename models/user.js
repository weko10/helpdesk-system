//responsible for all user operations

const pool = require("../util/database");

const User = {};

User.create = async (options = {}) => {
    // _id INT,
    // _username varchar(64),
    // _email varchar(64),
    // _password char(60),
    // _phone varchar(11),
    // _home_address varchar(64)

    try {
        //validate options param
        const attributes = options.attributes;
        if (attributes === undefined)
            throw Error("Options argrument was not passed any attributes");

        const result = await pool.execute(
            "CALL insert_or_update_user(0, ?, ?, ?, ?, ?);",
            [
                attributes.username || null,
                attributes.email || null,
                attributes.password || null,
                attributes.phone || null,
                attributes.homeAddress || null,
            ]
        );

        return result;
    } catch (err) {
        throw Error(err);
    }
};

User.findByPK = async (options = {}) => {
    try {
        //validate options param
        const where = options.where;
        if (where === undefined)
            throw Error("Options argrument was not passed any where filters");

        const result = await pool.execute("SELECT * FROM user WHERE id = ?", [
            where.id || null,
        ]);

        return result;
    } catch (err) {
        throw Error(err);
    }
};

User.findAll = async (options = {}) => {
    // _id INT,
    // _email VARCHAR(64)
    try {
        //validate options param
        const where = options.where;
        if (where === undefined)
            throw Error("Options argrument was not passed any where filters");

        const result = await pool.execute("CALL get_all_users(?, ?)", [
            where.id || null,
            where.email || null,
        ]);

        return result;
    } catch (err) {
        throw Error(err);
    }
};

User.isExist = async (options = {}) => {
    //Checks if a user exists by user id or email or both
    try {
        //validate options param
        const where = options.where;
        if (where === undefined)
            throw Error("Options argrument was not passed any where filters");

        const result = await pool.execute("SELECT is_user_exist(?, ?) AS result", [
            where.id || null,
            where.email || null,
        ]);

        return result;
    } catch (err) {
        throw Error(err);
    }
};

module.exports = User;
