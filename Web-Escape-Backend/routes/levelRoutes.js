import express from 'express';
import { getLevelData, submitAnswer } from '../controllers/levelController.js';
import isAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:level', isAuthenticated, getLevelData);

router.post('/:level/submit', isAuthenticated, submitAnswer);

export default router;
