import express from 'express';
import { createServiceRequest, listAllServices, listMyServices, updateServiceStatus } from '../controllers/serviceController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth);
router.get('/mine', listMyServices);
router.post('/', createServiceRequest);
router.get('/', requireRole(['ADMIN', 'TECHNICIAN']), listAllServices);
router.put('/:id/status', requireRole(['ADMIN', 'TECHNICIAN']), updateServiceStatus);

export default router;
