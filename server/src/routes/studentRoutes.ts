import { Router } from 'express';
import { getAllStudents, getStudentById, registerStudent, updateStudent } from '../controllers/studentController';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRole } from '../middlewares/verifyRole';
import { getCurrentStudent } from '../controllers/studentController';

const router = Router();

router.post('/add', verifyToken, verifyRole('admin'), registerStudent);
router.get('/me', verifyToken, getCurrentStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);

export default router;