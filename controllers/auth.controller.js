import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import { hashedPassword } from '../utils/hashPassword.js';
import { errorHandler } from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';
import { issueJWT } from '../utils/sighToken.js';
import crypto from 'crypto';
import { sendMail } from '../utils/sendEmail.js';
import verfiyTokenModel from '../models/verfiyToken.model.js';
import { getResetPasswordTemplate } from '../utils/resetPasswordTemplate.js';

export const registerUser = async (req, res, next) => {
    const { firstName, lastName, username, email, phoneNumber, schoolId, password } = req.body;

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
            username,
            phoneNumber,
            email,
            schoolId,
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
        const issuedToken = issueJWT(user._id.toString());

        const { password: pass, ...userInfo } = user._doc;

        res.cookie('access_token', issuedToken, { httpOnly: true }).status(200).json({ success: true, userInfo });
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res) => {
    res.cookie('access_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({ success: true, message: 'Successfully signed out' });
};

export const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const error = validationResult(req);

        if (!error.isEmpty()) {
            const errorMessage = error.errors.map((err) => err.msg);
            return next(new errorHandler(errorMessage[0], 400));
        }

        const user = await userModel.findById(req.userId);
        if (!user) {
            return next(new errorHandler('User not found', 404));
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return next(new errorHandler('Old password is incorrect', 400));
        }

        const hashedP = await hashedPassword(newPassword);
        user.password = hashedP;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return next(new errorHandler('No user found with this email', 404));
        }

        const existingVerificationToken = await verfiyTokenModel.findOne({ userId: user._id });

        if (existingVerificationToken) {
            await verfiyTokenModel.deleteOne();
        }

        const reset_Token = crypto.randomBytes(32).toString('hex');

        await new verfiyTokenModel({
            userId: user._id,
            token: reset_Token,
            createdAt: Date.now()
        }).save();

        const resetToken = reset_Token;
        const userId = user._id;

        const resetUrl = `${process.env.FrontEndUrl}/reset-password/${resetToken}/${userId}`;

        const message = getResetPasswordTemplate(user.username, resetUrl);

        await sendMail({
            email: user.email,
            subject: 'BITS SHOP Password Reset',
            message
        });

        res.status(200).json({
            success: true,
            message: `Password reset link has been sent to ${user.email}`
        });
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    const { token, userId } = req.params;
    console.log(req.params);
    console.log(req.body);
    const passwordResetToken = await verfiyTokenModel.findOne({
        userId
    });

    if (!passwordResetToken || passwordResetToken.token !== token) {
        return next(new errorHandler('Your token is expired or invalid. Try resetting your password again', 400));
    }

    const user = await userModel.findById(userId);

    const error = validationResult(req);

    if (!error.isEmpty()) {
        const errorMessage = error.errors.map((err) => err.msg);
        return next(new errorHandler(errorMessage[0], 400));
    }

    const hashedP = await hashedPassword(req.body.password);
    user.password = hashedP;

    await verfiyTokenModel.findByIdAndDelete(passwordResetToken._id);

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password reset successfully'
    });
};
