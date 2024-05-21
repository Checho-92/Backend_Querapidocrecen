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
exports.addToCart = void 0;
const database_1 = require("../database"); // Importa el pool de conexiones a la base de datos
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body; // Obtiene los datos del cuerpo de la solicitud
    try {
        // Inserta el artículo en el carrito en la base de datos
        yield database_1.pool.query('INSERT INTO carrito (id_cliente, id_producto, cantidad) VALUES (?, ?, ?)', [userId, productId, quantity]);
        res.status(200).json({ message: 'Artículo agregado al carrito correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.addToCart = addToCart;
