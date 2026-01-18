import mongoose from 'mongoose'; // 👈 Need this for sessions
import User from '../models/User';
import Student from '../models/Student';
import bcrypt from 'bcryptjs';
import { sendEmail } from './mailService';
import crypto from 'crypto';

const generatePassword = () => Math.random().toString(36).slice(-8);

export const registerStudentService = async (data: any) => {
  const { firstName, lastName, email, studentId, dateOfBirth, phone } = data;


  const existingStudentId = await Student.findOne({ studentId });
  if (existingStudentId) {
    throw new Error(`Student ID ${studentId} is already taken.`);
  }


  const plainPassword = crypto.randomBytes(4).toString('hex');
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  let newUser;

  try {

    newUser = await User.create({
      email,
      password: hashedPassword,
      role: 'student',
      isVerified: true
    });

  } catch (err: any) {

    if (err.code === 11000) {
       const existingUser = await User.findOne({ email });
       const studentExists = await Student.findOne({ email });
       
       if (existingUser && !studentExists) {

         await User.deleteOne({ email });
         newUser = await User.create({
            email,
            password: hashedPassword,
            role: 'student',
            isVerified: true
         });
       } else {
         throw new Error('Student with this email already exists');
       }
    } else {
      throw err;
    }
  }

  try {

    const newStudent = await Student.create({
      user: newUser._id,
      firstName,
      lastName,
      email,
      studentId,
      dateOfBirth,
      phone
    });


    const emailSubject = 'Welcome to College';
    const emailBody = `Password: ${plainPassword}`;
    sendEmail(email, emailSubject, emailBody).catch(console.error);

    return newStudent;

  } catch (error) {

    if (newUser) {
      await User.findByIdAndDelete(newUser._id);
    }
    throw error;
  }
};