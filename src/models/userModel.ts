import { pool } from '../database';
import bcrypt from 'bcrypt';

export interface User {
    id_usuario?: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    password?: string;
    tipo_usuario?: string;
}

// Función para agregar un nuevo usuario a la base de datos
export const addUser = async (user: User): Promise<any> => {
    const { nombre, apellido, correo, password, tipo_usuario } = user;
    try {
        if (!password) {
            throw new Error("Password is required");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, password, tipo_usuario) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, correo, hashedPassword, tipo_usuario]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

// Función para obtener un usuario por correo electrónico
export const getUserByEmail = async (correo: string): Promise<User[] | null> => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        const users = rows as User[];
        return users;
    } catch (error) {
        throw error;
    }
};

// Función para obtener todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows as User[];
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un usuario parcialmente
export const updateUser = async (id_usuario: number, user: Partial<User>): Promise<any> => {
    const updates = [];
    const values = [];

    if (user.nombre !== undefined) {
        updates.push('nombre = ?');
        values.push(user.nombre);
    }
    if (user.apellido !== undefined) {
        updates.push('apellido = ?');
        values.push(user.apellido);
    }
    if (user.correo !== undefined) {
        updates.push('correo = ?');
        values.push(user.correo);
    }
    if (user.password !== undefined) {
        updates.push('password = ?');
        values.push(await bcrypt.hash(user.password, 10));  // Hash the password if it is being updated
    }
    if (user.tipo_usuario !== undefined) {
        updates.push('tipo_usuario = ?');
        values.push(user.tipo_usuario);
    }

    values.push(id_usuario);

    try {
        const [result] = await pool.query(
            `UPDATE usuarios SET ${updates.join(', ')} WHERE id_usuario = ?`,
            values
        );
        return result;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un usuario
export const deleteUser = async (id_usuario: number): Promise<any> => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Eliminar primero las filas dependientes en la tabla `permisos`
        await connection.query('DELETE FROM permisos WHERE id_usuario = ?', [id_usuario]);

        // Eliminar el usuario
        const [result] = await connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);

        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
