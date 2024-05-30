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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserByEmail = exports.addUser = void 0;
const database_1 = require("../database");
// Función para agregar un nuevo usuario a la base de datos
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, password, tipo_usuario } = user;
    try {
        const [result] = yield database_1.pool.query('INSERT INTO usuarios (nombre, apellido, correo, password, tipo_usuario) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, correo, password, tipo_usuario]);
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
// Función para actualizar un usuario
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, nombre, apellido, correo, password, tipo_usuario } = user;
    try {
        const [result] = yield database_1.pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, password = ?, tipo_usuario = ? WHERE id_usuario = ?', [nombre, apellido, correo, password, tipo_usuario, id_usuario]);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
// Función para eliminar un usuario
const deleteUser = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield database_1.pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
