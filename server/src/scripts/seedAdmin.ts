import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to DB...');


    const adminExists = await User.findOne({ email: 'arjun22august@gmail.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }


    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'arjun22august@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('Admin Created: arjun22august@gmail.com / admin123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();