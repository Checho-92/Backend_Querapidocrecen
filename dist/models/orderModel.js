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
const database_1 = require("../database");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, estado, cantidad, precio, direccion, nombre, id_cliente } = order;
    const [result] = yield database_1.pool.query('INSERT INTO pedido (fecha, estado, cantidad, precio, direccion, nombre, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha, estado, cantidad, precio, direccion, nombre, id_cliente]);
    return result;
});
exports.createOrder = createOrder;
