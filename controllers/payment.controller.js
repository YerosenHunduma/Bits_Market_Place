import { chapaPaymentInit } from '../config/chapaConfig.js';

export const paymentService = async (req, res, next) => {
    try {
        const data = await chapaPaymentInit(req.body);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};
