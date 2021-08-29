const Sequelize = require("sequelize"); //sequelize is used for session-store
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = new Sequelize(
    process.env.MYSQLDEFAULTDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        dialect: "mysql",
        logging: false,
    }
);

// sequelize.sync({ force: true });

module.exports = new SequelizeStore({
    db: sequelize,
    tableName: "session",
});