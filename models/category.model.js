import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String, default: 'https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Category', categorySchema);
