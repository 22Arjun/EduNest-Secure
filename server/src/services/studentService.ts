import User from '../models/User';
import Student from '../models/Student';
import bcrypt from 'bcryptjs';
import { sendEmail } from './mailService';


const generatePassword = () => Math.random().toString(36).slice(-8);

export const registerStudentService = async (data: any) => {
  const { firstName, lastName, email, studentId, dateOfBirth, phone } = data;


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Student with this email already exists');
  }


  const plainPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);


  const newUser = await User.create({
    email,
    password: hashedPassword,
    role: 'student',
    isVerified: true
  });


  const newStudent = await Student.create({
    user: newUser._id,
    firstName,
    lastName,
    email,
    studentId,
    dateOfBirth,
    phone
  });


  const emailSubject = 'Welcome to College - Your Login Credentials';
  const emailBody = `
    <h3>Hello ${firstName},</h3>
    <p>You have been registered in the Student Management System.</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Temporary Password:</b> ${plainPassword}</p>
    <p>Please login and change your password immediately.</p>
  `;

  await sendEmail(email, emailSubject, emailBody);

  return newStudent;
};