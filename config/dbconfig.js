const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("db-test", "username", "password", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

const connectDB = () => {
  sequelize
    .sync()
    .then(() => {
      console.log("connect to db");
    })
    .catch((err) => {
      console.log("failed to connect to db");
    });
};

module.exports = { connectDB, sequelize };
