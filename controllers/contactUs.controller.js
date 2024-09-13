import contactUsModel from '../models/contactUs.model.js';

export const contactUs = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    try {
        await contactUsModel.create({
            ...req.body
        });

        res.status(201).json({ message: 'message sent successfully' });
    } catch (error) {
        next(error);
    }
};
