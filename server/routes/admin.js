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
    const users = await User.find().select('-password');
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
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'seller') {
      return res.status(404).json({ message: 'Seller not found' });
    }

    user.isApproved = true;
    await user.save();
    res.json(user);
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
    await Saree.findByIdAndDelete(req.params.id);
    res.json({ message: 'Saree removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
