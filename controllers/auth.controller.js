import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import { hashedPassword } from '../utils/hashPassword.js';
import { errorHandler } from '../utils/errorHandler.js';

export const registerUser = async (req, res, next) => {
    const { firstName, lastName, email, schoolId, username, password } = req.body;
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            const errorMessage = error.errors.map((err) => err.msg);

            return next(new errorHandler(errorMessage[0], 400));
        }
        const hashedP = await hashedPassword(password);

        await new userModel({
            firstName,
            lastName,
            email,
            schoolId,
            username,
            password: hashedP
        }).save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};
