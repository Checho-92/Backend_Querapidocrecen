"use strict";
//autController.ts
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importación del módulo jsonwebtoken para generar y verificar tokens JWT
const database_1 = require("../database"); // Importación del pool de conexiones a la base de datos
const bcrypt_1 = __importDefault(require("bcrypt")); // Importación del módulo bcrypt para el manejo de contraseñas (hashing y verificación)
// Función asíncrona para manejar el inicio de sesión
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // Obtención de las credenciales (email y contraseña) del cuerpo de la solicitud
    try {
        // Consulta a la base de datos para obtener el usuario con el correo proporcionado
        const [results] = yield database_1.pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
        // Verificación si no se encontró ningún usuario con el correo proporcionado
        if (results.length === 0) {
            res.status(401).json({ message: 'Credenciales incorrectas' }); // Respuesta con estado 401 (no autorizado) y mensaje de credenciales incorrectas
            return;
        }
        const user = results[0]; // Obtención del primer (y único) usuario de los resultados
        // Comparación de la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        // Verificación si la contraseña no es válida
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciales incorrectas' }); // Respuesta con estado 401 (no autorizado) y mensaje de credenciales incorrectas
            return;
        }
        // Generación de un token JWT con el ID del usuario, válido por 1 hora
        const token = jsonwebtoken_1.default.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });
        // Respuesta con estado 200 (éxito), token generado y datos del usuario
        res.status(200).json({ token, user: { id: user.id_usuario, nombre: user.nombre } });
    }
    catch (error) {
        console.error(error); // Impresión del error en consola para propósitos de depuración
        res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
    }
});
exports.login = login;
