import categoryModel from '../models/category.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const createCategory = async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const Category = await categoryModel.findOne({ name });
        if (Category) {
            return next(new errorHandler('Category already exists', 400));
        }

        await new categoryModel({ name, description }).save();

        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.find({});

        if (!categories.length) {
            return next(new errorHandler('Category not found', 400));
        }

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};
