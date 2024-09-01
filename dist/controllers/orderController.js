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
exports.createOrder = void 0;
const database_1 = require("../database"); // Asegúrate de importar pool correctamente
// Función para crear un nuevo pedido
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cliente, direccion } = req.body;
    try {
        // Obtener los artículos del carrito del cliente
        const [cartItems] = yield database_1.pool.query('SELECT * FROM carrito WHERE id_cliente = ? AND estado = ?', [id_cliente, 'pendiente']);
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }
        // Crear un nuevo pedido
        const [orderResult] = yield database_1.pool.query('INSERT INTO pedido (id_cliente, fecha, estado, direccion) VALUES (?, NOW(), ?, ?)', [id_cliente, 'pendiente', direccion]);
        const orderId = orderResult.insertId;
        // Insertar cada artículo del carrito en la tabla de detalles del pedido
        for (const item of cartItems) {
            yield database_1.pool.query('INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio, nombre_producto) VALUES (?, ?, ?, ?, ?)', [orderId, item.id_producto, item.cantidad, item.precio, item.nombre]);
        }
        // Actualizar el estado de los artículos del carrito a 'completado'
        yield database_1.pool.query('UPDATE carrito SET estado = ? WHERE id_cliente = ? AND estado = ?', ['completado', id_cliente, 'pendiente']);
        res.status(201).json({ message: 'Pedido creado correctamente' });
    }
    catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createOrder = createOrder;
