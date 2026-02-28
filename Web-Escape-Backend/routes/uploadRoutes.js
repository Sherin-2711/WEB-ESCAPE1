import express from 'express';
import isAuthenticated from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/image', isAuthenticated, upload.single('image'), uploadImage);

router.delete('/image', isAuthenticated, deleteImage);

export default router;
