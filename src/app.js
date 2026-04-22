import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const corsOptions = {
    origin: `http://localhost:${process.env.PORT || 3001}`,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRouter);
app.use('/api/', productRoutes)
app.use(express.static(path.join(__dirname, '../public')));



export default app;