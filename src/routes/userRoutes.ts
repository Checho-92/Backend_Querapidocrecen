// userRoutes.ts
import express from 'express';
import { login } from '../controllers/authController';
import { registerUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

export default router;
