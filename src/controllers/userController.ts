import { Request, Response } from 'express';
import { addUser, getUserByEmail } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' });
        return;
    }

    const tipoUsuario = 'cliente';

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser && existingUser.length > 0) {
            res.status(500).json({ message: 'Usuario ya registrado' });
            return;
        }

        const user = {
            nombre: firstName,
            apellido: lastName,
            correo: email,
            password,
            tipo_usuario: tipoUsuario
        };

        const result = await addUser(user);
        
        // Obtener el ID del nuevo usuario insertado
        const userId = result.insertId;
        
        // Insertar en la tabla `clientes`
        await pool.query('INSERT INTO clientes (id_cliente, nombre) VALUES (?, ?)', [userId, firstName]);
        
        // Insertar en la tabla `permisos`
        await pool.query('INSERT INTO permisos (id_usuario, permiso) VALUES (?, ?)', [userId, 'add_to_cart']);

        // Generar token
        const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuario registrado correctamente', token, user: { id: userId, nombre: firstName } });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export { registerUser };
