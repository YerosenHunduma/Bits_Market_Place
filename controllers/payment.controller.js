import paymentModel from '../models/payment.model.js';
import { Chapa } from 'chapa-nodejs';
import crypto from 'crypto';
import { errorHandler } from '../utils/errorHandler.js';
import userModel from '../models/user.model.js';

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

export const webhook = async (req, res, next) => {
    const secret = process.env.webhook_secret_key;
    try {
        const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
        if (hash == req.headers['x-chapa-signature']) {
            console.log(req.body.tx_ref);
            const payment = await paymentModel.findOne({ tx_ref: req.body.tx_ref });
            if (!payment) {
                return next(new errorHandler('Payment not found', 404));
            }
            const amount1 = req.body.amount - req.body.charge;
            const bits_transaction_charge = (amount1 * 3) / 100;
            const balance = amount1 - bits_transaction_charge;
            payment.status = req.body.status;
            payment.currency = req.body.currency;
            payment.created_at = req.body.created_at;
            payment.updated_at = req.body.updated_at;
            payment.payment_method = req.body.payment_method;
            payment.reference = req.body.reference;
            payment.chapa_transactio_charge = req.body.charge;
            payment.bits_transaction_charge = bits_transaction_charge;
            payment.balance = balance;
            await payment.save();

            const user = await userModel.findById(sellerId);
            if (!user) {
                return next(new errorHandler('Seller not found', 404));
            }
            user.account_balance += balance;
            await user.save();
        }
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
