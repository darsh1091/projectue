import express from 'express';
import { createAddress, deleteAddress, listAddresses, updateAddress } from '../controllers/addressController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', listAddresses);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;
