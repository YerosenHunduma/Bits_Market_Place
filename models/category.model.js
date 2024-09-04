import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Category', categorySchema);
