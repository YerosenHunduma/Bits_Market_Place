import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler.js';

export const isAuthenticated = (req, res, next) => {
    const accessToken = req.cookies?.access_token;
    if (!accessToken) {
        return next(new errorHandler('Access denied.Please log in.', 401));
    }
    try {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new errorHandler(err.message, 401));
            }
            req.userId = decoded._id;

            next();
        });
    } catch (error) {
        next(error);
    }
};
