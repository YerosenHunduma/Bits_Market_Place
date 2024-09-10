import userModel from '../models/user.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { errorHandler } from '../utils/errorHandler.js';

export const addWishlist = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.userId, { $addToSet: { wishlist: req.body.productId } }, { new: true });
        if (!user) {
            return new errorHandler('User is not found', 404);
        }

        const { password: pass, ...userInfo } = user?._doc;
        res.status(200).json(userInfo);
    } catch (error) {
        next(error);
    }
};

export const removeFromWishlist = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.userId, { $pull: { wishlist: req.body.productId } }, { new: true });
        if (!user) {
            return new errorHandler('User is not found', 404);
        }

        const { password, ...userInfo } = user?._doc;
        res.status(200).json({ userInfo });
    } catch (error) {
        next(error);
    }
};

export const getUserWishlist = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId).populate('wishlist');
        if (!user) {
            return next(new errorHandler('user Not Found', 404));
        }

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    const { username, lastName, firstName, schoolId, email, phoneNumber } = req.body;
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return next(new errorHandler('User not found', 404));
        }

        user.username = username || user.username;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.schoolId = schoolId || user.schoolId;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        await user.save();

        const { password, ...updatedUser } = user._doc;
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const updateProfilePicture = async (req, res, next) => {
    const mainFolderName = 'profile';
    const userId = req?.userId;
    try {
        const result = await uploadToCloudinary(req.file.path, mainFolderName, req.body.public_id);

        const user = await userModel.findById(userId);
        if (!user) {
            return next(new errorHandler('User not found', 404));
        }

        user.profileImg.public_id = result.public_id;
        user.profileImg.secure_url = result.secure_url;
        await user.save();
        const { password, ...updatedUser } = user._doc;
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};
