//userRoutes.ts
import express from 'express';
import {login} from '../controllers/authController';
import { registerUser } from '../controllers/userController';
import { addToCart } from '../controllers/cartController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/cart/add', addToCart);

export default router;
