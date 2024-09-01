"use strict";
//userController.ts
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
exports.deleteUserAccount = exports.updateUserInformation = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel"); // Importación de las funciones del modelo de usuario
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importación del módulo jsonwebtoken para generar y verificar tokens JWT
const database_1 = require("../database"); // Importación del pool de conexiones a la base de datos
// Función asíncrona para registrar un nuevo usuario
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, confirmPassword } = req.body; // Obtención de los datos del usuario desde el cuerpo de la solicitud
    // Verificación de que las contraseñas coincidan
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' }); // Respuesta con estado 400 (solicitud incorrecta) si las contraseñas no coinciden
        return;
    }
    const tipoUsuario = 'cliente'; // Tipo de usuario predeterminado
    try {
        const existingUser = yield (0, userModel_1.getUserByEmail)(email); // Consulta a la base de datos para verificar si el usuario ya existe
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
        const result = yield (0, userModel_1.addUser)(user); // Llamada a la función addUser para agregar el nuevo usuario a la base de datos
        // Obtener el ID del nuevo usuario insertado
        const userId = result.insertId;
        // Insertar en la tabla `clientes`
        yield database_1.pool.query('INSERT INTO clientes (id_cliente, nombre) VALUES (?, ?)', [userId, firstName]);
        // Insertar en la tabla `permisos`
        yield database_1.pool.query('INSERT INTO permisos (id_usuario, permiso) VALUES (?, ?)', [userId, 'add_to_cart']);
        // Generar token JWT para el nuevo usuario
        const token = jsonwebtoken_1.default.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
        // Respuesta con estado 201 (creado), token generado y datos del usuario
        res.status(201).json({ message: 'Usuario registrado correctamente', token, user: { id: userId, nombre: firstName } });
    }
    catch (error) {
        console.error('Error registrando usuario:', error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
});
exports.registerUser = registerUser;
// Función asíncrona para actualizar la información del usuario
const updateUserInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, nombre, email, password } = req.body; // Obtención de los datos del usuario desde el cuerpo de la solicitud
    try {
        const updatedUser = yield (0, userModel_1.updateUser)(id_usuario, { nombre, correo: email, password }); // Llamada a la función updateUser para actualizar el usuario en la base de datos
        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser }); // Respuesta con estado 200 (éxito) y mensaje de actualización exitosa
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
});
exports.updateUserInformation = updateUserInformation;
// Función asíncrona para eliminar la cuenta de un usuario
const deleteUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtención del ID del usuario desde los parámetros de la solicitud
    try {
        yield (0, userModel_1.deleteUser)(parseInt(id)); // Llamada a la función deleteUser para eliminar el usuario de la base de datos
        res.status(200).json({ message: 'Cuenta eliminada correctamente' }); // Respuesta con estado 200 (éxito) y mensaje de eliminación exitosa
    }
    catch (error) {
        console.error('Error al eliminar la cuenta:', error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
});
exports.deleteUserAccount = deleteUserAccount;
