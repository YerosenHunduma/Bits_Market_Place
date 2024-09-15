import paymentModel from '../models/payment.model.js';
import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
    secretKey: process.env.Chapa_Secret_key
});

export const paymentService = async (req, res, next) => {
    const { firstName, lastName, email, price, productId, sellerId, productName } = req.body;
    const tx_ref = await chapa.generateTransactionReference();
    console.log(req.body);
    try {
        const data = await chapa.initialize({
            first_name: firstName,
            last_name: lastName,
            email: email,
            currency: 'ETB',
            amount: price,
            tx_ref: tx_ref,
            callback_url: 'https://yero-chapa.onrender.com/api/payment/myWebhook,',
            return_url: 'https://asset-marketsquare-react-jsou.onrender.com'
        });

        if (data.status === 'success') {
            await new paymentModel({
                tx_ref,
                customerFirstName: firstName,
                customerLastName: lastName,
                customerEmail: email,
                price: price,
                productId: productId,
                sellerId: sellerId,
                customerId: req.userId,
                productName: productName
            }).save();
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const verify = async (req, res, next) => {
    const { tx_ref } = req.body;

    try {
        const response = await chapa.verify({
            tx_ref
        });
    } catch (error) {
        next(error);
    }
};
