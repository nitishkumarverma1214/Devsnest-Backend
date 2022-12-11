const { Sequelize } = require("sequelize");
const createDB = new Sequelize("test-db", "username", "password", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

module.exports = createDB;
