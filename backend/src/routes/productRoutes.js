import express from 'express';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAuth, requireRole(['ADMIN']), createProduct);
router.put('/:id', requireAuth, requireRole(['ADMIN']), updateProduct);
router.delete('/:id', requireAuth, requireRole(['ADMIN']), deleteProduct);

export default router;
