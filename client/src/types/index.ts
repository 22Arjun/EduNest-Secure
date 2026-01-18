// src/types/index.ts

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  course: string;
  year: number;
  dateOfBirth: string; 
  phone: string;
  address?: string; 
}