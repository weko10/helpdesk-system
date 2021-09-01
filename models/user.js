//responsible for all user operations

const pool = require("../util/database");

const User = {};

User.create = (options = {}) => {
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
            throw new Error("Options argrument was not passed any attributes");

        return pool.execute("CALL insert_or_update_user(0, ?, ?, ?, ?, ?);", [
            attributes.username || null,
            attributes.email || null,
            attributes.password || null,
            attributes.phone || null,
            attributes.homeAddress || null,
        ]);
    } catch (err) {
        throw new Error(err);
    }
};

User.findByPK = (options = {}) => {
    try {
        //validate options param
        const where = options.where;
        if (where === undefined)
            throw new Error("Options argrument was not passed any where filters");

        return pool.execute("SELECT * FROM user WHERE id = ?", [where.id || null]);
    } catch (err) {
        throw new Error(err);
    }
};

User.findAll = (options = {}) => {
    // _id INT,
    // _email VARCHAR(64)
    try {
        //validate options param
        const where = options.where;
        if (where === undefined)
            throw new Error("Options argrument was not passed any where filters");

        return pool.execute("CALL get_all_users(?, ?)", [
            where.id || null,
            where.email || null,
        ]);
    } catch (err) {
        throw new Error(err);
    }
};

User.isExist = (options = undefined) => {
    //Checks if a user exists by user id or email or both
    try {
        //validate options param
        const where = options.where;
        if (where === {})
            throw new Error("Options argrument was not passed any where filters");

        return pool.execute("SELECT is_user_exist(?, ?) AS result", [
            where.id || null,
            where.email || null,
        ]);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = User;
