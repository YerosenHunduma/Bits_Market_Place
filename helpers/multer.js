import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { errorHandler } from '../utils/errorHandler.js';

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const checkFiletype = (file, cb) => {
    const filetypes = /jpeg|jpg|png/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new errorHandler('Invalid file type, You can only upload jpeg, jpg and png', 400), false);
    }
};

export const uploadImageFromLocalToServer = multer({
    storage,
    // limits: { filesize: 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkFiletype(file, cb);
    }
});
