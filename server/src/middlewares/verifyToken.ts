import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } 

  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }


  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    

    req.user = decoded;
    
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};