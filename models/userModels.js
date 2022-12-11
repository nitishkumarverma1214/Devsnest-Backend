const { Model, DataTypes } = require("sequelize");
// database connection instance
const sequelize = require("../config/dbconfig");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "User" }
);

module.exports = User;
