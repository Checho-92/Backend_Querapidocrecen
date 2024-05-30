import { pool } from '../database';
import { ResultSetHeader } from 'mysql2/promise';

export interface User {
    id_usuario?: number;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    tipo_usuario: string;
}

// Función para agregar un nuevo usuario a la base de datos
export const addUser = async (user: User): Promise<ResultSetHeader> => {
    const { nombre, apellido, correo, password, tipo_usuario } = user;
    try {
        const [result]: [ResultSetHeader, any] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, password, tipo_usuario) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, correo, password, tipo_usuario]
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
        return users
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

// Función para actualizar un usuario
export const updateUser = async (user: User): Promise<any> => {
    const { id_usuario, nombre, apellido, correo, password, tipo_usuario } = user;
    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, password = ?, tipo_usuario = ? WHERE id_usuario = ?',
            [nombre, apellido, correo, password, tipo_usuario, id_usuario]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un usuario
export const deleteUser = async (id_usuario: number): Promise<any> => {
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        return result;
    } catch (error) {
        throw error;
    }
};
