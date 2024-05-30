// cartRoutes.ts
import express from 'express';
import { addToCart, getCartItems } from '../controllers/cartController';

const router = express.Router();

router.post('/cart/add', addToCart);
router.get('/cart/:userId', getCartItems);

export default router;
