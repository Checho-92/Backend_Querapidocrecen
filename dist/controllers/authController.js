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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database"); // Importa el pool de conexiones a la base de datos
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud
    try {
        // Verifica las credenciales del usuario en la base de datos
        const [results] = yield database_1.pool.query('SELECT * FROM usuarios WHERE correo = ? AND password = ?', [email, password]);
        if (results.length === 0) { // Verifica si no hay resultados o si el array de resultados está vacío
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }
        // Genera un token de autenticación
        const user = results[0];
        const token = jsonwebtoken_1.default.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user.id_usuario, nombre: user.nombre } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.login = login;
