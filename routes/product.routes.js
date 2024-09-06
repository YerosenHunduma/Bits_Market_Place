import express from 'express';
import * as product from '../controllers/product.controller.js';
import { uploadImageFromLocalToServer } from '../helpers/multer.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-product', isAuthenticated, uploadImageFromLocalToServer.array('file', 10), product.createProduct);
router.get('/get-all-products', product.getAllProducts);
router.get('/get-product/:id', product.getProduct);

export default router;
