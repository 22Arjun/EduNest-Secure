import { Request, Response } from 'express';
import { loginUserService } from '../services/authService';
import { sendOTPService, verifyOTPAndResetService } from '../services/authService';


export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUserService(req.body);



    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
      token
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const logout = (req: Request, res: Response) => {

  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
};


export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await sendOTPService(req.body.email);
    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    await verifyOTPAndResetService(email, otp, newPassword);
    res.status(200).json({ success: true, message: 'Password reset successful. Please login.' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};