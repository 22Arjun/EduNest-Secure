import { Request } from 'express';

export interface AuthRequest extends Request {
    user?: {
        type: string;
        role: string;
    };
};