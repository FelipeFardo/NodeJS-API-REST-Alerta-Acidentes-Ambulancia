const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("alertaambulancias", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
