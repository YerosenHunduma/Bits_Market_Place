import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import { hashedPassword } from '../utils/hashPassword.js';
import { errorHandler } from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';
import { issueJWT } from '../utils/sighToken.js';

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

export const signin = async (req, res, next) => {
    const { schoolId, password } = req.body;
    try {
        const user = await userModel.findOne({ schoolId });

        if (!user) {
            return next(new errorHandler('Invalid school ID or password', 401));
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new errorHandler('Invalid school ID or password', 401));
        }

        const issuedToken = issueJWT(user.email);

        const { password: pass, ...userInfo } = user._doc;

        res.cookie('access_token', issuedToken, { httpOnly: true }).status(200).json({ success: true, userInfo });
    } catch (error) {
        next(error);
    }
};
