import express from 'express';
import { createOrder, listAllOrders, listOrders, requestCancel, requestReturn, updateStatus } from '../controllers/orderController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth);
router.get('/', listOrders);
router.get('/admin/all', requireRole(['ADMIN']), listAllOrders);
router.post('/', createOrder);
router.put('/:id/status', requireRole(['ADMIN']), updateStatus);
router.post('/:id/cancel', requestCancel);
router.post('/:id/return', requestReturn);

export default router;
