import express from 'express';
import { login } from '../controllers/authController';
import { registerUser, updateUserInformation } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update-user', updateUserInformation);

export default router;
