import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
    {
        productId: { type: String },
        sellerId: { type: String },
        customerFirstName: { type: String },
        customerLastName: { type: String },
        price: { type: String },
        customerEmail: { type: String },
        tx_ref: { type: String },
        productName: { type: String },
        status: { type: String, enum: ['pending', 'failed', 'success'], default: 'pending' },
        customerId: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Payment', paymentSchema);
