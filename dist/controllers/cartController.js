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
exports.getCartItems = exports.addToCart = exports.getProductsByCategory = void 0;
const database_1 = require("../database");
// Función para verificar permisos
const hasPermission = (userId, permission) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.pool.query('SELECT * FROM permisos WHERE id_usuario = ? AND permiso = ?', [userId, permission]);
    return rows.length > 0;
});
// Función para obtener productos por categoría
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    try {
        const [rows] = yield database_1.pool.query('SELECT * FROM producto WHERE categoria = ?', [category]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getProductsByCategory = getProductsByCategory;
// Función para agregar un producto al carrito
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        if (yield hasPermission(userId, 'add_to_cart')) {
            const [productRows] = yield database_1.pool.query('SELECT nombre, precio, imagen FROM producto WHERE id_producto = ?', [productId]);
            if (productRows.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            const product = productRows[0];
            const price = product.precio;
            const subTotal = price * quantity;
            const total = subTotal; // Puedes agregar lógica adicional si hay descuentos o impuestos
            const [result] = yield database_1.pool.query('INSERT INTO carrito (id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, productId, price, quantity, subTotal, total, 'pendiente', product.nombre, product.imagen]);
            res.status(200).json({ message: 'Artículo agregado al carrito correctamente', result });
        }
        else {
            res.status(403).json({ message: 'No tienes permisos para agregar al carrito' });
        }
    }
    catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.addToCart = addToCart;
// Función para obtener los artículos del carrito de un usuario
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const [rows] = yield database_1.pool.query('SELECT c.id_carrito, c.nombre, c.imagen, c.precio, c.cantidad, c.sub_total, c.total FROM carrito c WHERE c.id_cliente = ? AND c.estado = ?', [userId, 'pendiente']);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener los artículos del carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getCartItems = getCartItems;
