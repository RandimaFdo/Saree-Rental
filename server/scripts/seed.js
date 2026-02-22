const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Saree = require('../models/Saree');
const connectDB = require('../config/database');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Saree.deleteMany();

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      isApproved: true,
    });
    await admin.save();

    // Create sample sellers
    const seller1Password = await bcrypt.hash('seller123', salt);
    const seller1 = new User({
      name: 'Seller One',
      email: 'seller1@example.com',
      password: seller1Password,
      role: 'seller',
      isApproved: true,
    });
    await seller1.save();

    const seller2Password = await bcrypt.hash('seller123', salt);
    const seller2 = new User({
      name: 'Seller Two',
      email: 'seller2@example.com',
      password: seller2Password,
      role: 'seller',
      isApproved: true,
    });
    await seller2.save();

    // Create sample sarees
    const sarees = [
      {
        title: 'Elegant Red Silk Saree',
        description: 'Beautiful red silk saree perfect for weddings and special occasions. Made from premium silk with intricate embroidery.',
        pricePerDay: 50,
        color: 'Red',
        occasion: 'Wedding',
        images: ['https://via.placeholder.com/400x500?text=Red+Silk+Saree'],
        sellerId: seller1._id,
        availabilityDates: [{ start: new Date(), end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }],
      },
      {
        title: 'Blue Cotton Saree',
        description: 'Comfortable blue cotton saree ideal for casual wear and everyday occasions.',
        pricePerDay: 30,
        color: 'Blue',
        occasion: 'Casual',
        images: ['https://via.placeholder.com/400x500?text=Blue+Cotton+Saree'],
        sellerId: seller2._id,
        availabilityDates: [{ start: new Date(), end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }],
      },
      {
        title: 'Green Embroidered Saree',
        description: 'Stunning green saree with gold embroidery, perfect for festive occasions and parties.',
        pricePerDay: 75,
        color: 'Green',
        occasion: 'Festive',
        images: ['https://via.placeholder.com/400x500?text=Green+Embroidered+Saree'],
        sellerId: seller1._id,
        availabilityDates: [{ start: new Date(), end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }],
      },
      {
        title: 'Purple Bridal Saree',
        description: 'Luxurious purple bridal saree with heavy work and traditional design.',
        pricePerDay: 100,
        color: 'Purple',
        occasion: 'Wedding',
        images: ['https://via.placeholder.com/400x500?text=Purple+Bridal+Saree'],
        sellerId: seller2._id,
        availabilityDates: [{ start: new Date(), end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }],
      },
    ];

    await Saree.insertMany(sarees);

    console.log('Seed data inserted successfully');
    console.log('Admin login: admin@example.com / admin123');
    console.log('Seller login: seller1@example.com / seller123');
    console.log('Seller login: seller2@example.com / seller123');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
