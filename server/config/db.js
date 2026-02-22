const { Pool } = require("pg");
const sequelize = require('./sequelize');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "silkswap",   // ← THIS must match pgAdmin
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
    await sequelize.sync({ alter: true }); // sync models with alter
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Associations
const User = require('../models/User');
const Saree = require('../models/Saree');
const Booking = require('../models/Booking');

User.hasMany(Saree, { foreignKey: 'sellerId' });
Saree.belongsTo(User, { foreignKey: 'sellerId' });

Saree.hasMany(Booking, { foreignKey: 'sareeId' });
Booking.belongsTo(Saree, { foreignKey: 'sareeId' });

User.hasMany(Booking, { foreignKey: 'buyerId', as: 'buyerBookings' });
Booking.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

User.hasMany(Booking, { foreignKey: 'sellerId', as: 'sellerBookings' });
Booking.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

module.exports = { connectDB, sequelize, pool };