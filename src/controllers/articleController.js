import articleRepository from '../services/articleRepository.js';
import isValidId from './validation.js';

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleRepository.getAll();
        res.status(200).json({ data: articles });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            type: 'https://example.com/probs/internal-server-error',
            title: 'Internal Server Error',
            status: 500,
            detail: 'An unexpected error occurred while fetching articles.',
            instance: req.originalUrl
        });
    }
};

const getArticleById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                type: 'https://example.com/probs/invalid-id',
                title: 'Bad Request',
                status: 400,
                detail: 'Invalid article ID format.',
                instance: req.originalUrl
            });
        }

        const article = await articleRepository.getById(req.params.id);
        
        if (!article) {
            return res.status(404).json({
                type: 'https://example.com/probs/not-found',
                title: 'Not Found',
                status: 404,
                detail: 'Article not found.',
                instance: req.originalUrl
            });
        }
        
        res.status(200).json({ data: article });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            type: 'https://example.com/probs/internal-server-error',
            title: 'Internal Server Error',
            status: 500,
            detail: 'An unexpected error occurred while fetching article.',
            instance: req.originalUrl
        });
    }
}

export default {
    getAllArticles,
    getArticleById
}

// Best Practices and Improvements:
// 1. Specific Error Handling:
// Instead of sending a generic 500 error, you can differentiate between different types of errors (e.g., database errors, validation errors) and send more specific status codes and messages.
// 2. Logging Errors:
// It's a good practice to log errors for debugging purposes. You can use a logging library or simply console.error(error) to log the error details.
// 3. Consistent Response Structure:
// Consider sending a consistent response structure for both success and error cases. This can help clients of your API handle responses more easily.
// 4. Avoid Sending Raw Error Objects:
// Sending the raw error object can expose sensitive information. Instead, send a user-friendly message.
// 5. Use Middleware for Error Handling:
// In Express, you can use middleware to handle errors globally, which can help keep your route handlers clean.