import express from 'express';
import { getOrders, getOrdersById, createOrders, updateOrders, deleteOrders, getOrdersDikirim, getOrdersSelesai, getOrdersBerlangsung, getOrdersUserSelesai } from '../controllers/Orders.js';
import { VerifyPengguna } from '../middleware/AuthPenggunaMiddleware.js';
import { VerifyAdmin } from '../middleware/AuthAdminMiddleware.js';

const router = express.Router();

router.get('/orders', VerifyAdmin, getOrders);
router.get('/orders/dikirim', VerifyAdmin, getOrdersDikirim);
router.get('/orders/selesai', VerifyAdmin, getOrdersSelesai);
router.get('/orders/berlangsung', VerifyPengguna, getOrdersBerlangsung);
router.get('/orders/user/selesai', VerifyPengguna, getOrdersUserSelesai);
router.get('/orders/:id', getOrdersById);
router.post('/orders', VerifyPengguna, createOrders);
router.patch('/orders/:id', VerifyAdmin, updateOrders);
router.delete('/orders/:id', deleteOrders);

export default router;
