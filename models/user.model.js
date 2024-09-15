import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        phoneNumber: { type: String, required: true },
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
        account_balance: { type: String, default: '0' },
        isBlocked: { type: Boolean, default: false },
        purchasedProdcuts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        profileImg: {
            public_id: {
                type: String
            },
            secure_url: {
                type: String
            }
        },
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('user', userSchema);
