import express from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import globalErrorHandler from '../middlewares/globalErrorHandler.js';
import categoryRoutes from './category.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use(globalErrorHandler);

export default router;
