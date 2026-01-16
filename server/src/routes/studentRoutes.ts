import { Router } from 'express';
import { registerStudent } from '../controllers/studentController';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRole } from '../middlewares/verifyRole';

const router = Router();

router.post('/add', verifyToken, verifyRole('admin'), registerStudent);

export default router;