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
exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' });
        return;
    }
    const tipoUsuario = 'cliente';
    try {
        const verify = yield (0, userModel_1.getUserByEmail)(email);
        if (verify.length > 0) {
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
        const result = yield (0, userModel_1.addUser)(user);
        res.status(201).json({ message: 'Usuario registrado correctamente', userId: result.insertId });
    }
    catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.registerUser = registerUser;
