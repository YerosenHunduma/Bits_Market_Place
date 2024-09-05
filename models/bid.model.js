import { Schema, model } from 'mongoose';

const bidSchema = new Schema(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productOwner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bidder: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        message: { type: String },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Bid', bidSchema);
