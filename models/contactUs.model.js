import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
    {
        firstName: String,
        LastName: String,
        email: { type: String, required: true },
        phoneNumber: String,
        message: { type: String, require: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Contact', contactSchema);
