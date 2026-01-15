import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';


export const verifyRole = (requiredRole: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }


    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        message: `Access denied. You are not an ${requiredRole}` 
      });
    }

    next();
  };
};