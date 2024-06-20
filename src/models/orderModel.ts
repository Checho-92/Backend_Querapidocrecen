//orderModel.ts
import { pool } from '../database';
import { ResultSetHeader } from 'mysql2/promise';

interface Order {
    fecha: number;
    estado: string;
    cantidad: number;
    precio: number;
    direccion: string;
    nombre: string;
    id_cliente: number;
}

export const createOrder = async (order: Order): Promise<ResultSetHeader> => {
    const { fecha, estado, cantidad, precio, direccion, nombre, id_cliente } = order;
    const [result] = await pool.query(
        'INSERT INTO pedido (fecha, estado, cantidad, precio, direccion, nombre, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [fecha, estado, cantidad, precio, direccion, nombre, id_cliente]
    );
    return result as ResultSetHeader;
};
