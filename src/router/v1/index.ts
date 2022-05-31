import express from 'express';
import authRoutes from './authRoutes';
import userRouter from './userRoutes';

const router = express.Router();

router.use('/user', userRouter)
router.use('/auth', authRoutes)

export default router;