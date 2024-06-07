// productRoutes.ts
import express, {Request, Response} from 'express';
import { getAll, getByCategory, getById, add, update, remove } from '../controllers/productController';


const router = express.Router();

router.get('/', getAll);
router.get('/category/:category', getByCategory);
router.get('/:id', getById);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;

