import User from '../models/User';
import OTP from '../models/OTP';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from './mailService';

export const loginUserService = async (data: any) => {
  const { email, password } = data;


  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Error('Invalid email');
  }


  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  // 3. Generate Token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' } 
  );


  return { 
    user: { id: user._id, email: user.email, role: user.role }, 
    token 
  };
};

// --- FORGOT PASSWORD: SEND OTP ---
export const sendOTPService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save to DB (Auto-deletes after 5 mins via MongoDB TTL)
  await OTP.create({ email, otp });

  // Send Email
  await sendEmail(email, 'Password Reset OTP', `Your OTP is: <b>${otp}</b>. It expires in 5 minutes.`);
  
  return true;
};

// --- FORGOT PASSWORD: VERIFY OTP & RESET ---
export const verifyOTPAndResetService = async (email: string, otp: string, newPassword: string) => {
  // 1. Check if OTP exists and matches
  const record = await OTP.findOne({ email, otp });
  if (!record) throw new Error('Invalid or Expired OTP');

  // 2. Hash the new Password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 3. Update the User's password
  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  // 4. Delete the used OTP
  await OTP.deleteOne({ _id: record._id });

  return true;
};