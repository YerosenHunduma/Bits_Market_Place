import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    schoolId: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBlocked: { type: Boolean, default: false },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
    profileImg: { type: String, default: '' },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

export default model('user', userSchema);
