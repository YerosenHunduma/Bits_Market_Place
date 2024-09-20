import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.js';
import { connectDb } from './config/dbConfig.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import { seed } from "./seeder/admin.seed.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: ['http://localhost:5175', 'https://bits-shop.onrender.com', 'https://bits-shop.vercel.app'],
        credentials: true
    })
);

const PORT = process.env.PORT || 3000;

app.use('/api', rootRouter);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
    });

// seed();
