import fs from 'fs';
import { cloudinaryConfig } from '../config/cloudinaryConfig.js';

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
    await cloudinary.uploader
        .destroy(profileCloudId)
        .then(() => {
            console.log('picture deleted successfully');
        })
        .catch((err) => {
            console.log(err);
        });
};
