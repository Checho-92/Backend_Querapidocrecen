//userRoutes.ts

import express from 'express';
import { login } from '../controllers/authController';
import { registerUser, updateUserInformation, deleteUserAccount } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update-user', updateUserInformation);
router.delete('/delete-user/:id', deleteUserAccount);  // Nueva ruta para eliminar cuenta

export default router;
