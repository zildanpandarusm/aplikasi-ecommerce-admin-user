import express from 'express';
import { createSaran, deleteSaran, getSaran, getSaranTerbaru } from '../controllers/Saran.js';
import { VerifyPengguna } from '../middleware/AuthPenggunaMiddleware.js';
import { VerifyAdmin } from '../middleware/AuthAdminMiddleware.js';

const router = express.Router();

router.get('/saran', VerifyAdmin, getSaran);
router.get('/saran/terbaru', VerifyAdmin, getSaranTerbaru);
router.post('/saran', VerifyPengguna, createSaran);
router.delete('/saran/:id', VerifyAdmin, deleteSaran);

export default router;
