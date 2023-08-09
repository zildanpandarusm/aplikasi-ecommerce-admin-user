import express from 'express';
import { createBarang, deleteBarang, getBarang, getBarangById, updateBarang, getBarangByKategoriId, getBarangBeberapa, getBarangPenjualanTerbanyak, getCariBarang } from '../controllers/Barang.js';
import { VerifyAdmin } from '../middleware/AuthAdminMiddleware.js';

const router = express.Router();

router.get('/barang', getBarang);
router.get('/caribarang', getCariBarang);
router.get('/barangbeberapa', getBarangBeberapa);
router.get('/barangpenjualanterbanyak', getBarangPenjualanTerbanyak);
router.get('/barang/:id', getBarangById);
router.get('/barang/kategori/:ktgrid', getBarangByKategoriId);
router.post('/barang', VerifyAdmin, createBarang);
router.patch('/barang/:id', VerifyAdmin, updateBarang);
router.delete('/barang/:id', VerifyAdmin, deleteBarang);

export default router;
