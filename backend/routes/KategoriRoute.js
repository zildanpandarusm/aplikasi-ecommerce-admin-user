import express from 'express';
import { createKategori, deleteKategori, getKategori, getKategoriById, updateKategori } from '../controllers/Kategori.js';
import { VerifyAdmin } from '../middleware/AuthAdminMiddleware.js';

const router = express.Router();

router.get('/kategori', getKategori);
router.get('/kategori/:id', getKategoriById);
router.post('/kategori', VerifyAdmin, createKategori);
router.patch('/kategori/:id', VerifyAdmin, updateKategori);
router.delete('/kategori/:id', VerifyAdmin, deleteKategori);

export default router;
