const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/dbconfig");

class Url extends Model {}

Url.init(
  {
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Url",
  }
);

module.exports = Url;
