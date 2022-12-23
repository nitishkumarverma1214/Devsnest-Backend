const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig");
const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: DataTypes.TEXT,
  price: DataTypes.DECIMAL,
  content: DataTypes.TEXT,
});

module.exports = Product;
