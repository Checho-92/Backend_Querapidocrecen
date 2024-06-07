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
exports.remove = exports.update = exports.add = exports.getById = exports.getByCategory = exports.getAll = void 0;
const productModel_1 = require("../models/productModel");
// Obtener todos los productos
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productModel_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAll = getAll;
// Obtener productos por categoría
const getByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    console.log(category);
    try {
        const products = yield (0, productModel_1.getProductsByCategory)(category);
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getByCategory = getByCategory;
// Obtener producto por ID
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, productModel_1.getProductById)(Number(id));
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getById = getById;
// Agregar un nuevo producto
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria, nombre, talla, estado, precio, imagen } = req.body;
    try {
        const result = yield (0, productModel_1.addProduct)({ categoria, nombre, talla, estado, precio, imagen });
        res.status(201).json({ message: 'Producto agregado correctamente', productId: result.insertId });
    }
    catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.add = add;
// Actualizar un producto
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { categoria, nombre, talla, estado, precio, imagen } = req.body;
    try {
        const success = yield (0, productModel_1.updateProduct)(Number(id), { categoria, nombre, talla, estado, precio, imagen });
        if (success) {
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.update = update;
// Eliminar un producto
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const success = yield (0, productModel_1.deleteProduct)(Number(id));
        if (success) {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.remove = remove;
