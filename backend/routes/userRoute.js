import express from 'express';
import { loginAdmin, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/login', loginUser);
userRouter.get('/register', registerUser);
userRouter.get('/admin', loginAdmin);

export default userRouter;