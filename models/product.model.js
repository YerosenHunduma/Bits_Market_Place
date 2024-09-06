import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                secure_url: {
                    type: String,
                    required: true
                }
            }
        ],
        price: { type: Number, required: true },
        isApproved: { type: Boolean, default: false },
        status: { type: String, enum: ['available', 'sold', 'lent', 'pending'], default: 'pending' },
        category: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Product', productSchema);
