            //cartRoutes.ts
            import express from 'express';
            import { addToCart, getCartItems, updateCartItem, deleteCartItem } from '../controllers/cartController';

            const router = express.Router();

            router.post('/add', addToCart);
            router.get('/:userId', getCartItems);
            router.put('/update', updateCartItem);
            router.delete('/delete', deleteCartItem);

            export default router;
