"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserByEmail = exports.addUser = void 0;
//userModel.ts
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Función para agregar un nuevo usuario a la base de datos
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, password, tipo_usuario } = user;
    try {
        if (!password) {
            throw new Error("Password is required");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result] = yield database_1.pool.query('INSERT INTO usuarios (nombre, apellido, correo, password, tipo_usuario) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, correo, hashedPassword, tipo_usuario]);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.addUser = addUser;
// Función para obtener un usuario por correo electrónico
const getUserByEmail = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        const users = rows;
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
// Función para obtener todos los usuarios
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.pool.query('SELECT * FROM usuarios');
        return rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
// Función para actualizar un usuario parcialmente
const updateUser = (id_usuario, user) => __awaiter(void 0, void 0, void 0, function* () {
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
        values.push(yield bcrypt_1.default.hash(user.password, 10)); // Hash the password if it is being updated
    }
    if (user.tipo_usuario !== undefined) {
        updates.push('tipo_usuario = ?');
        values.push(user.tipo_usuario);
    }
    values.push(id_usuario);
    try {
        const [result] = yield database_1.pool.query(`UPDATE usuarios SET ${updates.join(', ')} WHERE id_usuario = ?`, values);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
// Función para eliminar un usuario
const deleteUser = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.pool.getConnection();
    try {
        yield connection.beginTransaction();
        // Eliminar primero las filas dependientes en la tabla `permisos`
        yield connection.query('DELETE FROM permisos WHERE id_usuario = ?', [id_usuario]);
        // Eliminar el usuario
        const [result] = yield connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        yield connection.commit();
        return result;
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
});
exports.deleteUser = deleteUser;
