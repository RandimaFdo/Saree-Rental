const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('silkswap', 'postgres', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
