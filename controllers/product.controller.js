import productModel from '../models/product.model.js';
import { apiFilter } from '../utils/apiFilters.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../utils/cloudinary.js';
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

export const updateProduct = async (req, res, next) => {
    const mainFolderName = 'products';
    try {
        const productId = JSON.parse(req.body.formData).product_id;
        if (req.files && req.files.length > 0) {
            const uploadedImages = req.files.map(async (file) => {
                return await uploadToCloudinary(file.path, mainFolderName);
            });

            const uploadResults = await Promise.all(uploadedImages);
            var successfulUploads = uploadResults.filter((url) => url !== null);
        }
        const updatedProduct = await productModel.findByIdAndUpdate(productId, { ...JSON.parse(req.body.formData), $addToSet: { images: successfulUploads } }, { new: true });
        if (!updatedProduct) {
            return next(new errorHandler('Product not found', 404));
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    const resPerPage = 8;
    try {
        const prodApiFilter = new apiFilter(productModel, req.query).search().filters().sort();
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

export const getUserProduct = async (req, res, next) => {
    try {
        const products = await productModel.find({ seller: req.userId });

        if (!products) {
            return next(new errorHandler('No products found', 404));
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const deleteImage = async (req, res, next) => {
    const mainFolderName = 'products';
    const { _id, public_id } = req.body;
    console.log(req.body);
    try {
        const deletedImg = await deleteFromCloudinary(public_id);
        if (!deletedImg) {
            return next(new errorHandler('Failed to delete image', 500));
        }
        console.log(deletedImg);
        const product = await productModel.findById(_id);
        if (!product) {
            return next(new errorHandler('Prodcut not found', 404));
        }

        product.images = product.images.filter((image) => image.public_id !== public_id);
        console.log(product);
        await product.save();
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        next(error);
    }
};
