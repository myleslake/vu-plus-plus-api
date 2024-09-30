import express from 'express';
import userRoutes from './userRoutes.js';
import articleRoutes from './articleRoutes.js';
const router = express.Router();

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

export default router;