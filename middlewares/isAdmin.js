import userModel from '../models/user.model';
import { errorHandler } from '../utils/errorHandler.js';

export const isAdmin = async (req, res, next) => {
    const user = await userModel.findOne({ email: req.email });

    if (user?.isAdmin) {
        next();
    } else {
        next(new errorHandler('your are not authorized to access this resource', 401));
    }
};
