import express from 'express';
import { createReview, listReviews } from '../controllers/reviewController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:productId', listReviews);
router.post('/', requireAuth, createReview);

export default router;
