import { model, Schema } from 'mongoose';

const verifyResetTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 900
    }
});

export default model('verificationToken', verifyResetTokenSchema);
