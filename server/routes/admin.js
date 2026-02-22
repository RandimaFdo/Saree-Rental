const express = require('express');
const User = require('../models/User');
const Saree = require('../models/Saree');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all users
router.get('/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Approve seller
router.put('/users/:id/approve', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const user = await User.findByPk(req.params.id);
    if (!user || user.role !== 'seller') {
      return res.status(404).json({ message: 'Seller not found' });
    }

    await User.update({ isApproved: true }, { where: { id: req.params.id } });
    const updatedUser = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Remove listing
router.delete('/sarees/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const saree = await Saree.findByPk(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }

    await Saree.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Saree removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
