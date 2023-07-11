const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Accident = db.define("Accident", {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gravity: {
    type: DataTypes.STRING,
    required: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Accident;
