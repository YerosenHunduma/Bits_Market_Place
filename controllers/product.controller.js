import productModel from '../models/product.model.js';
import { apiFilter } from '../utils/apiFilters.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { errorHandler } from '../utils/errorHandler.js';

export const createProduct = async (req, res, next) => {
    const mainFolderName = 'products';
    try {
        const uploadedImages = req.files.map(async (file) => {
            return await uploadToCloudinary(file.path, mainFolderName);
        });

        const uploadResults = await Promise.all(uploadedImages);
        const successfulUploads = uploadResults.filter((url) => url !== null);

        await new productModel({
            ...JSON.parse(req.body.formData),
            images: successfulUploads,
            seller: req.userId
        }).save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    const resPerPage = 8;
    console.log(req.query);
    try {
        const prodApiFilter = new apiFilter(productModel, req.query).search();

        let products = await prodApiFilter.query;
        const filteredProductCount = products.length;

        prodApiFilter.pagination(resPerPage);

        products = await prodApiFilter.query.clone();

        res.status(200).json({ resPerPage, filteredProductCount, products });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);

        if (!product) {
            return next(new errorHandler('Product not found', 404));
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};
