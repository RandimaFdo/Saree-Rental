const mongoose = require('mongoose');

const sareeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // URLs to images
  }],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  availabilityDates: [{
    start: Date,
    end: Date,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Saree', sareeSchema);
