import express from 'express';
import { createOrderItem, deleteOrderItem, getOrderItem, getOrderItemById, getOrderItemByOrdersId } from '../controllers/OrderItem.js';
import { VerifyPengguna } from '../middleware/AuthPenggunaMiddleware.js';

const router = express.Router();

router.get('/orderitem', getOrderItem);
router.get('/orderitem/order/:id', getOrderItemByOrdersId);
router.get('/orderitem/:id', getOrderItemById);
router.post('/orderitem', VerifyPengguna, createOrderItem);
router.delete('/orderitem/:id', VerifyPengguna, deleteOrderItem);

export default router;
