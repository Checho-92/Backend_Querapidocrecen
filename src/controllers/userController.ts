//userController.ts

import { Request, Response } from 'express'; // Importación de las interfaces Request y Response de Express
import { addUser, getUserByEmail, updateUser, deleteUser } from '../models/userModel'; // Importación de las funciones del modelo de usuario
import jwt from 'jsonwebtoken'; // Importación del módulo jsonwebtoken para generar y verificar tokens JWT
import { pool } from '../database'; // Importación del pool de conexiones a la base de datos

// Función asíncrona para registrar un nuevo usuario
const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password, confirmPassword } = req.body; // Obtención de los datos del usuario desde el cuerpo de la solicitud

    // Verificación de que las contraseñas coincidan
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' }); // Respuesta con estado 400 (solicitud incorrecta) si las contraseñas no coinciden
        return;
    }

    const tipoUsuario = 'cliente'; // Tipo de usuario predeterminado

    try {
        const existingUser = await getUserByEmail(email); // Consulta a la base de datos para verificar si el usuario ya existe

        // Verificación si el usuario ya está registrado
        if (existingUser && existingUser.length > 0) {
            res.status(500).json({ message: 'Usuario ya registrado' }); // Respuesta con estado 500 (error del servidor) si el usuario ya existe
            return;
        }

        // Creación del objeto usuario con los datos proporcionados
        const user = {
            nombre: firstName,
            apellido: lastName,
            correo: email,
            password,
            tipo_usuario: tipoUsuario
        };

        const result = await addUser(user); // Llamada a la función addUser para agregar el nuevo usuario a la base de datos
        
        // Obtener el ID del nuevo usuario insertado
        const userId = result.insertId;
        
        // Insertar en la tabla `clientes`
        await pool.query('INSERT INTO clientes (id_cliente, nombre) VALUES (?, ?)', [userId, firstName]);
        
        // Insertar en la tabla `permisos`
        await pool.query('INSERT INTO permisos (id_usuario, permiso) VALUES (?, ?)', [userId, 'add_to_cart']);

        // Generar token JWT para el nuevo usuario
        const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });

        // Respuesta con estado 201 (creado), token generado y datos del usuario
        res.status(201).json({ message: 'Usuario registrado correctamente', token, user: { id: userId, nombre: firstName } });
    } catch (error) {
        console.error('Error registrando usuario:', error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
};

// Función asíncrona para actualizar la información del usuario
const updateUserInformation = async (req: Request, res: Response) => {
    const { id_usuario, nombre, email, password } = req.body; // Obtención de los datos del usuario desde el cuerpo de la solicitud

    try {
        const updatedUser = await updateUser(id_usuario, { nombre, correo: email, password }); // Llamada a la función updateUser para actualizar el usuario en la base de datos
        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser }); // Respuesta con estado 200 (éxito) y mensaje de actualización exitosa
    } catch (error) {
        console.error('Error al actualizar el usuario:', error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
};

// Función asíncrona para eliminar la cuenta de un usuario
const deleteUserAccount = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtención del ID del usuario desde los parámetros de la solicitud

    try {
        await deleteUser(parseInt(id)); // Llamada a la función deleteUser para eliminar el usuario de la base de datos
        res.status(200).json({ message: 'Cuenta eliminada correctamente' }); // Respuesta con estado 200 (éxito) y mensaje de eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar la cuenta:', error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
};

export { registerUser, updateUserInformation, deleteUserAccount }; // Exportación de las funciones para que puedan ser utilizadas en otros módulos
