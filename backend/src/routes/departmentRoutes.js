import express from 'express';
import { listCategories, listDepartments } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', listDepartments);
router.get('/categories', listCategories);

export default router;
