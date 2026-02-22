const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  },
  isApproved: {
    type: Boolean,
    default: function() {
      return this.role !== 'seller'; // Sellers need approval
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
