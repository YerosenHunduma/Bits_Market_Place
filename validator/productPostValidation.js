import { body } from 'express-validator';

export const createProductValidator = [
    body('name').notEmpty().withMessage('product name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    body('seller').notEmpty().withMessage('seller field is required'),
    body('price').notEmpty().withMessage('price field is required'),
    body('category').notEmpty().withMessage('category field is required')
];
