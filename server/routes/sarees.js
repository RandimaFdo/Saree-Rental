const express = require('express');
const Saree = require('../models/Saree');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all sarees with filters
router.get('/', async (req, res) => {
  try {
    const { price, color, occasion, availability } = req.query;
    let query = {};

    if (price) query.pricePerDay = { $lte: parseInt(price) };
    if (color) query.color = new RegExp(color, 'i');
    if (occasion) query.occasion = new RegExp(occasion, 'i');

    if (availability) {
      const date = new Date(availability);
      query.availabilityDates = {
        $elemMatch: {
          start: { $lte: date },
          end: { $gte: date },
        },
      };
    }

    const sarees = await Saree.find(query).populate('sellerId', 'name email');
    res.json(sarees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single saree
router.get('/:id', async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id).populate('sellerId', 'name email');
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }
    res.json(saree);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add saree (seller only)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('pricePerDay').isNumeric().isFloat({ min: 0 }),
  body('color').notEmpty(),
  body('occasion').notEmpty(),
], async (req, res) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, pricePerDay, color, occasion, images, availabilityDates } = req.body;

    const saree = new Saree({
      title,
      description,
      pricePerDay,
      color,
      occasion,
      images,
      sellerId: req.user.id,
      availabilityDates,
    });

    await saree.save();
    res.json(saree);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update saree (seller only)
router.put('/:id', auth, async (req, res) => {
  try {
    let saree = await Saree.findById(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    if (saree.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    saree = await Saree.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(saree);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete saree (seller or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    if (saree.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Saree.findByIdAndDelete(req.params.id);
    res.json({ message: 'Saree removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
