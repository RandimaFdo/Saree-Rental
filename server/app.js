const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sarees', require('./routes/sarees'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => res.send('API Running'));

module.exports = app;
