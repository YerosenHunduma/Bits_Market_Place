import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});
export const uploadToCloudinary = async (localFilePath, mainFolderName, profileCloudId) => {
    if (profileCloudId) {
        await cloudinary.uploader.destroy(profileCloudId);
    }
    return await cloudinary.uploader
        .upload(localFilePath, { folder: { folder: mainFolderName } })
        .then((result) => {
            fs.unlinkSync(localFilePath);
            return {
                secure_url: result.secure_url,
                public_id: result.public_id
            };
        })
        .catch((err) => {
            fs.unlinkSync(localFilePath);
            return {
                message: err.message,
                error: err.message
            };
        });
};

export const deleteFromCloudinary = async (profileCloudId) => {
    try {
        const result = await cloudinary.uploader.destroy(profileCloudId);

        return {
            result
        };
    } catch (err) {
        return {
            message: 'Failed to delete image',
            error: err.message
        };
    }
};
