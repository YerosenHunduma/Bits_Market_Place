import { body } from 'express-validator';

export const createBidValidator = [
    body('productId').notEmpty().withMessage('product id field is required'),
    body('bidderId').notEmpty().withMessage('bidder id field is required'),
    body('seller').notEmpty().withMessage('seller id field is required'),
    body('amount').notEmpty().withMessage('amount field is required'),
    body('productName').notEmpty().withMessage('product name field is required'),
    body('bidderName').notEmpty().withMessage('bidder name field is required')
];
