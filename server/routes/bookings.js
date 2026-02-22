const express = require('express');
const Booking = require('../models/Booking');
const Saree = require('../models/Saree');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'buyer') {
      query.buyerId = req.user.id;
    } else if (req.user.role === 'seller') {
      query.sellerId = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('sareeId', 'title images pricePerDay')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create booking
router.post('/', auth, [
  body('sareeId').isMongoId(),
  body('rentalStartDate').isISO8601(),
  body('rentalEndDate').isISO8601(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { sareeId, rentalStartDate, rentalEndDate } = req.body;

    const saree = await Saree.findById(sareeId);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    const start = new Date(rentalStartDate);
    const end = new Date(rentalEndDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalAmount = days * saree.pricePerDay;

    // Check availability
    const conflictingBooking = await Booking.findOne({
      sareeId,
      $or: [
        { rentalStartDate: { $lte: end }, rentalEndDate: { $gte: start } },
      ],
      status: { $in: ['pending', 'confirmed'] },
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Saree not available for selected dates' });
    }

    const booking = new Booking({
      sareeId,
      buyerId: req.user.id,
      sellerId: saree.sellerId,
      rentalStartDate: start,
      rentalEndDate: end,
      totalAmount,
    });

    await booking.save();
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
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
