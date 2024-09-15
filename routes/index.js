import express from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import globalErrorHandler from '../middlewares/globalErrorHandler.js';
import categoryRoutes from './category.routes.js';
import userRoutes from './user.routes.js';
import bidRoutes from './bid.routes.js';
import paymentRoutes from './payment.routes.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/user', userRoutes);
router.use('/bid', isAuthenticated, bidRoutes);
router.use('/payment', isAuthenticated, paymentRoutes);
router.use(globalErrorHandler);

export default router;
