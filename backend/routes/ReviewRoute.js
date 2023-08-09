import express from 'express';
import { createReview, deleteReview, getReview, getReviewById, getReviewTerbaru, updateReview } from '../controllers/Review.js';
import { VerifyPengguna } from '../middleware/AuthPenggunaMiddleware.js';
import { VerifyAdmin } from '../middleware/AuthAdminMiddleware.js';

const router = express.Router();

router.get('/review', getReview);
router.get('/review/terbaru', getReviewTerbaru);
router.get('/review/:id', VerifyPengguna, getReviewById);
router.post('/review', VerifyPengguna, createReview);
router.patch('/review/:id', VerifyPengguna, updateReview);
router.delete('/review/:id', VerifyAdmin, deleteReview);

export default router;
