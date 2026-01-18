import { Request, Response } from 'express';
import { registerStudentService } from '../services/studentService';
import Student from '../models/Student';

export const registerStudent = async (req: Request, res: Response) => {
  try {

    const student = await registerStudentService(req.body);
    
    res.status(201).json({ 
      success: true, 
      message: 'Student registered and credentials sent to email', 
      data: student 
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};



export const getCurrentStudent = async (req: any, res: Response) => {
  try {

    const userId = req.user.id; 

    const student = await Student.findOne({ user: userId });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student profile not found." });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};



export const getAllStudents = async (req: Request, res: Response) => {
  try {

    const students = await Student.find();


    res.status(200).json({
      success: true,
      data: students 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server Error: Could not fetch students",
      error: error
    });
  }
};



export const getStudentById = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;


    const student = await Student.findById(id);


    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }


    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: error
    });
  }
};



export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;


    const student = await Student.findByIdAndUpdate(id, updates, { 
      new: true, 
      runValidators: true 
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Update failed",
      error: error
    });
  }
};