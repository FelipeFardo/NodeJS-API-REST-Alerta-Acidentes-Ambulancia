const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Accident = require("./Accident");

const Car = db.define("Car", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plate: {
    type: DataTypes.STRING,
    required: true,
  },
  tipe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Car.hasMany(Accident);
Accident.belongsTo(Car);

module.exports = Car;
