import express from 'express';
import { LoginAdmin, MeAdmin, logoutAdmin } from '../controllers/AuthAdmin.js';
import { LoginPengguna, MePengguna, logoutPengguna } from '../controllers/AuthPengguna.js';

const router = express.Router();

router.get('/me', MeAdmin);
router.post('/login', LoginAdmin);
router.delete('/logout', logoutAdmin);
router.get('/pengguna/me', MePengguna);
router.post('/pengguna/login', LoginPengguna);
router.delete('/pengguna/logout', logoutPengguna);

export default router;
