import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';

connectDB();

const app = express();

//Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}))

//Routes 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
})

const PORT = process.env.PORT || 3239;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
