import { body } from 'express-validator';

export const contactUsValidator = [
    body('message').notEmpty().withMessage('message field is required'),
    body('email').trim().isEmail().withMessage('Please enter a valid email').normalizeEmail().toLowerCase()
];
