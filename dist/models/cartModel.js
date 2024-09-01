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
exports.getCartItems = exports.deleteCartItem = exports.updateCartItemQuantity = exports.addCartItem = void 0;
//cartModel.ts
const database_1 = require("../database");
// Función para agregar un producto al carrito
const addCartItem = (cartItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen } = cartItem;
    try {
        const [result] = yield database_1.pool.query('INSERT INTO carrito (id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen]);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.addCartItem = addCartItem;
// Función para actualizar la cantidad de un producto en el carrito
const updateCartItemQuantity = (id_cliente, id_carrito, cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield database_1.pool.query('UPDATE carrito SET cantidad = ?, sub_total = precio * ?, total = precio * ? WHERE id_cliente = ? AND id_carrito = ?', [cantidad, cantidad, cantidad, id_cliente, id_carrito]);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateCartItemQuantity = updateCartItemQuantity;
// Función para eliminar un producto del carrito
const deleteCartItem = (id_cliente, id_carrito) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield database_1.pool.query('DELETE FROM carrito WHERE id_cliente = ? AND id_carrito = ?', [id_cliente, id_carrito]);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCartItem = deleteCartItem;
// Función para obtener los productos del carrito de un usuario
const getCartItems = (id_cliente) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.pool.query('SELECT id_carrito, nombre, imagen, precio, cantidad, sub_total, total FROM carrito WHERE id_cliente = ? AND estado = ?', [id_cliente, 'pendiente']);
        return rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getCartItems = getCartItems;
