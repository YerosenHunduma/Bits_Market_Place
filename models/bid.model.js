import { Schema, model } from 'mongoose';

const bidSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        productName: { type: String, required: true },
        sellerId: { type: String, required: true },
        message: { type: String },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Bid', bidSchema);
