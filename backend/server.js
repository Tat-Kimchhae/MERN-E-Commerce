import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import cloudinary, { connectCloudinary } from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

connectDB();
connectCloudinary();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});