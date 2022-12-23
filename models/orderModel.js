const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  productId: DataTypes.INTEGER,
  buyerId: DataTypes.INTEGER,
});

module.exports = Order;
Order.belongsTo(userModel, { foreignKey: "buyerId" });
userModel.hasMany(Order, { foreignKey: "id" });
// Order.hasMany(productModel, { foreignKey: "productId" });
