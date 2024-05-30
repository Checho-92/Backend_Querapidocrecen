// productRoutes.ts
import express from 'express';
import { getAll, getByCategory, getById, add, update, remove } from '../controllers/productController';

const router = express.Router();

router.get('/products', getAll);
router.get('/products/category/:category', getByCategory);
router.get('/products/:id', getById);
router.post('/products', add);
router.put('/products/:id', update);
router.delete('/products/:id', remove);

export default router;
