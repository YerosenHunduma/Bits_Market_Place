import { body } from 'express-validator';

export const registrationValidator = [
    body('firstName').trim().notEmpty().withMessage('First name field is required'),
    body('username').trim().notEmpty().withMessage('username field is required'),
    body('phoneNumber').trim().notEmpty().withMessage('phone number field is required'),
    body('schoolId').trim().notEmpty().withMessage('schooId field is required'),
    body('lastName').trim().notEmpty().withMessage('Last name field is required'),
    body('email').trim().isEmail().withMessage('Please enter a valid email').normalizeEmail().toLowerCase(),
    body('password')
        .trim()
        .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minLowercase: 1,
            minSymbols: 1,
            minUppercase: 1
        })
        .withMessage('Password must be 8+ chars with lowercase, uppercase, numeric, and special symbols.'),
    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords must match')
];
