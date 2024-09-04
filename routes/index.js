import express from 'express';
import authRoutes from './auth.routes.js';
import globalErrorHandler from '../middlewares/globalErrorHandler.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use(globalErrorHandler);

export default router;
