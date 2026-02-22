const express = require('express');
const Booking = require('../models/Booking');
const Saree = require('../models/Saree');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const router = express.Router();

// Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    let where = {};
    if (req.user.role === 'buyer') {
      where.buyerId = req.user.id;
    } else if (req.user.role === 'seller') {
      where.sellerId = req.user.id;
    }

    const bookings = await Booking.findAll({
      where,
      include: [
        {
          model: Saree,
          as: 'saree',
          attributes: ['title', 'images', 'pricePerDay']
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'seller',
          attributes: ['name', 'email']
        }
      ]
    });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create booking
router.post('/', auth, [
  body('sareeId').isInt(),
  body('rentalStartDate').isISO8601(),
  body('rentalEndDate').isISO8601(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { sareeId, rentalStartDate, rentalEndDate } = req.body;

    const saree = await Saree.findByPk(sareeId);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    const start = new Date(rentalStartDate);
    const end = new Date(rentalEndDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalAmount = days * saree.pricePerDay;

    // Check availability
    const conflictingBooking = await Booking.findOne({
      where: {
        sareeId,
        [Op.or]: [
          {
            rentalStartDate: { [Op.lte]: end },
            rentalEndDate: { [Op.gte]: start }
          }
        ],
        status: { [Op.in]: ['pending', 'confirmed'] }
      }
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Saree not available for selected dates' });
    }

    const booking = await Booking.create({
      sareeId,
      buyerId: req.user.id,
      sellerId: saree.sellerId,
      rentalStartDate: start,
      rentalEndDate: end,
      totalAmount,
    });

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update booking status (seller or admin)
router.put('/:id/status', auth, [
  body('status').isIn(['confirmed', 'cancelled']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.sellerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Booking.update({ status: req.body.status }, { where: { id: req.params.id } });
    const updatedBooking = await Booking.findByPk(req.params.id);
    res.json(updatedBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
