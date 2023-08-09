import express from 'express';
import { createPengguna, deletePengguna, getPengguna, getPenggunaById, getPenggunaLimaTerbaru, updatePengguna } from '../controllers/Pengguna.js';
import { VerifyAdmin } from '../middleware/AuthAdminMiddleware.js';

const router = express.Router();

router.get('/pengguna', VerifyAdmin, getPengguna);
router.get('/pengguna/terbaru', VerifyAdmin, getPenggunaLimaTerbaru);
router.get('/pengguna/:id', getPenggunaById);
router.post('/pengguna', createPengguna);
router.patch('/pengguna/:id', updatePengguna);
router.delete('/pengguna/:id', deletePengguna);

export default router;
