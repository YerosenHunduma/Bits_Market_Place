import express from 'express';
import * as product from '../controllers/product.controller.js';
import { uploadImageFromLocalToServer } from '../helpers/multer.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-product', isAuthenticated, uploadImageFromLocalToServer.array('file', 10), product.createProduct);
router.put('/update-product', isAuthenticated, uploadImageFromLocalToServer.array('file', 10), product.updateProduct);
router.delete('/delete-product', isAuthenticated, product.deletedProduct);
router.get('/get-all-products', product.getAllProducts);
router.get('/get-product/:id', product.getProduct);
router.get('/get-user-products', isAuthenticated, product.getUserProduct);
router.delete('/delete-product-img', isAuthenticated, product.deleteImage);

export default router;
