import express from 'express';
import articleController from '../../controllers/articleController.js';

const router = express.Router();

router.route('/')
    .get(articleController.getAllArticles);

router.route('/:id')
    .get(articleController.getArticleById);

export default router;