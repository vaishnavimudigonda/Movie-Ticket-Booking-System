const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movieclick';

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@movieclick.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Since we have a pre-save hook in User model that hashes passwords,
    // we should NOT manually hash the password here.
    // The hook will hash 'admin123' before saving.
    await User.create({
      name: 'Admin User',
      email: 'admin@movieclick.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@movieclick.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
