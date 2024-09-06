import express from 'express';
import * as category from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create-category', category.createCategory);
router.get('/get-all-categories', category.getAllCategories);

export default router;
