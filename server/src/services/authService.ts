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

  // if (user.role !== 'admin') {
  //   throw new Error('Access Denied: You do not have Admin privileges.');
  // }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

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


export const sendOTPService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.create({ email, otp });

  await sendEmail(email, 'Password Reset OTP', `Your OTP is: <b>${otp}</b>. It expires in 5 minutes.`);
  
  return true;
};


export const verifyOTPAndResetService = async (email: string, otp: string, newPassword: string) => {

  const record = await OTP.findOne({ email, otp });
  if (!record) throw new Error('Invalid or Expired OTP');

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  await OTP.deleteOne({ _id: record._id });

  return true;
};