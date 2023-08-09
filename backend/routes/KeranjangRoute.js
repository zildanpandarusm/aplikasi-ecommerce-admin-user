import express from 'express';
import { createKeranjang, deleteKeranjang, getKeranjang, getKeranjangById, updateKeranjang } from '../controllers/Keranjang.js';
import { VerifyPengguna } from '../middleware/AuthPenggunaMiddleware.js';

const router = express.Router();

router.get('/keranjang', VerifyPengguna, getKeranjang);
router.get('/keranjang/:id', VerifyPengguna, getKeranjangById);
router.post('/keranjang', VerifyPengguna, createKeranjang);
router.patch('/keranjang/:id', VerifyPengguna, updateKeranjang);
router.delete('/keranjang/:id', VerifyPengguna, deleteKeranjang);

export default router;
