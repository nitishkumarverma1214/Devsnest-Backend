const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig");
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
  isSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
