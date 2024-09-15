import { body } from 'express-validator';

export const changePasswordValidator = [
    body('newPassword')
        .trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1
        })
        .withMessage('Password must be 8+ chars with lowercase, uppercase, numeric, and special symbols.'),
    body('confirmNewPassword')
        .custom((value, { req }) => value === req.body.newPassword)
        .withMessage('Passwords must match')
];
