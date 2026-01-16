import { Request, Response } from 'express';
import { registerStudentService } from '../services/studentService';

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