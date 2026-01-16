// src/types/index.ts

export interface Student {
  _id: string; // MongoDB ID
  firstName: string;
  lastName: string;
  email: string;
  studentId: string; // Previously rollNumber
  course: string;
  year: number;
  dateOfBirth: string; // YYYY-MM-DD
  phone: string;
  address?: string; // Optional
}