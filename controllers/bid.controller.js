import bidModel from '../models/bid.model.js';
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';
import { getNewBidEmailTemplate } from '../utils/getNewBidTemplate.js';
import { sendMail } from '../utils/sendEmail.js';

export const bidRequest = async (req, res, next) => {
    const { productId, bidderId, sellerId, amount, message, productName, bidderName } = req.body;

    try {
        const newBid = await bidModel.create({ productId, bidderId, amount, message });
        const product = await productModel.findByIdAndUpdate(productId, { $push: { bids: newBid._id } });
        if (!product) {
            return next(new errorHandler('product is not found', 404));
        }
        const seller = await userModel.findById(sellerId);

        if (!seller) {
            return next(new errorHandler('seller is not found', 404));
        }

        await sendMail({
            email: seller.email,
            subject: 'New bid recieved',
            message: getNewBidEmailTemplate(seller.username, productName, amount, bidderName)
        });

        res.status(201).json({ message: 'Your bid recieved' });
    } catch (error) {
        next(error);
    }
};

export const sellerGetBids = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const bids = await bidModel.find({ productId: productId });
        if (!bids) {
            return next(new errorHandler('You have no bid', 404));
        }
        res.status(200).json(bids);
    } catch (error) {
        next(error);
    }
};

export const bidderGetBids = async (req, res, next) => {
    try {
        const bids = await bidModel.find({ bidderId: req.userId });
        if (!bids) {
            return next(new errorHandler('You have no bid history', 404));
        }
        res.status(200).json(bids);
    } catch (error) {
        next(error);
    }
};

export const sellerRejectAction = async (req, res, next) => {
    const { bidId } = req.params;
    try {
        const bid = await bidModel.findByIdAndUpdate(bidId, { status: 'rejected' });

        res.status(200).json({ message: 'bid status updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const sellerAcceptAction =async (req, res,next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}
