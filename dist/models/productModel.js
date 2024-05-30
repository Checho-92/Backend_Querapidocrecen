"use strict";
// productModel.ts
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
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProductById = exports.getProductsByCategory = exports.getAllProducts = void 0;
const database_1 = require("../database");
// Obtener todos los productos
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.pool.query('SELECT * FROM producto');
    return rows;
});
exports.getAllProducts = getAllProducts;
// Obtener productos por categoría
const getProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.pool.query('SELECT * FROM producto WHERE categoria = ?', [category]);
    return rows;
});
exports.getProductsByCategory = getProductsByCategory;
// Obtener producto por ID
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.pool.query('SELECT * FROM producto WHERE id_producto = ?', [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
});
exports.getProductById = getProductById;
// Agregar un nuevo producto
const addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.pool.query('INSERT INTO producto (categoria, nombre, talla, estado, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)', [product.categoria, product.nombre, product.talla, product.estado, product.precio, product.imagen]);
    return result;
});
exports.addProduct = addProduct;
// Actualizar un producto
const updateProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.pool.query('UPDATE producto SET categoria = ?, nombre = ?, talla = ?, estado = ?, precio = ?, imagen = ? WHERE id_producto = ?', [product.categoria, product.nombre, product.talla, product.estado, product.precio, product.imagen, id]);
    return result.affectedRows > 0;
});
exports.updateProduct = updateProduct;
// Eliminar un producto
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.pool.query('DELETE FROM producto WHERE id_producto = ?', [id]);
    return result.affectedRows > 0;
});
exports.deleteProduct = deleteProduct;
