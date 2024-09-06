import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
    secretKey: process.env.Chapa_Secret_key
});

export const chapaPaymentInit = async ({ name, lastName, email, amount }) => {
    const tx_ref = await chapa.generateTransactionReference();
    const data = await chapa.initialize({
        first_name: name,
        last_name: lastName,
        email: email,
        currency: 'ETB',
        amount: amount,
        tx_ref: tx_ref,
        callback_url: 'https://yero-chapa.onrender.com/api/payment/myWebhook,',
        return_url: 'https://asset-marketsquare-react-jsou.onrender.com'
    });

    return data;
};
