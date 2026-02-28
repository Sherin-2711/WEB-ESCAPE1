import multer from 'multer';
import { cloudinaryStorage } from '../utils/cloudinary.js';

const upload = multer({
    storage: cloudinaryStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
