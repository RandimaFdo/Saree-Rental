const express = require('express');
const Saree = require('../models/Saree');
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Get all sarees with filters
router.get('/', async (req, res) => {
  try {
    const { price, color, occasion, availability } = req.query;
    let where = {};

    if (price) where.pricePerDay = { [Op.lte]: parseInt(price) };
    if (color) where.color = { [Op.iLike]: `%${color}%` };
    if (occasion) where.occasion = { [Op.iLike]: `%${occasion}%` };

    // Filter by seller if not admin
    if (req.user && req.user.role === 'seller') {
      where.sellerId = req.user.id;
    }

    // Note: availability filter not implemented for JSON field

    const sarees = await Saree.findAll({
      where,
      include: [{
        model: User,
        as: 'seller',
        attributes: ['name', 'email']
      }]
    });
    res.json(sarees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single saree
router.get('/:id', async (req, res) => {
  try {
    const saree = await Saree.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'seller',
        attributes: ['name', 'email']
      }]
    });
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

    const saree = await Saree.create({
      title,
      description,
      pricePerDay,
      color,
      occasion,
      images,
      sellerId: req.user.id,
      availabilityDates,
    });

    res.json(saree);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update saree (seller only)
router.put('/:id', auth, async (req, res) => {
  try {
    let saree = await Saree.findByPk(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    if (saree.sellerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Saree.update(req.body, { where: { id: req.params.id } });
    saree = await Saree.findByPk(req.params.id);
    res.json(saree);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete saree (seller or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const saree = await Saree.findByPk(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    if (saree.sellerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Saree.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Saree removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Upload images
router.post('/upload', auth, upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  const paths = req.files.map(file => `/uploads/${file.filename}`);
  res.json({ images: paths });
});

module.exports = router;
