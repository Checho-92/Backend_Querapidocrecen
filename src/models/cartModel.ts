            //cartModel.ts
            import { pool } from '../database';

            interface CartItem {
                id_carrito?: number;
                id_cliente: number;
                id_producto: number;
                precio: number;
                cantidad: number;
                sub_total: number;
                total: number;
                estado: string;
                nombre: string;
                imagen: string;
            }

            // Función para agregar un producto al carrito
            export const addCartItem = async (cartItem: CartItem): Promise<any> => {
                const { id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen } = cartItem;
                try {
                    const [result] = await pool.query(
                        'INSERT INTO carrito (id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen]
                    );
                    return result;
                } catch (error) {
                    throw error;
                }
            };

            // Función para actualizar la cantidad de un producto en el carrito
            export const updateCartItemQuantity = async (id_cliente: number, id_carrito: number, cantidad: number): Promise<any> => {
                try {
                    const [result] = await pool.query(
                        'UPDATE carrito SET cantidad = ?, sub_total = precio * ?, total = precio * ? WHERE id_cliente = ? AND id_carrito = ?',
                        [cantidad, cantidad, cantidad, id_cliente, id_carrito]
                    );
                    return result;
                } catch (error) {
                    throw error;
                }
            };

            // Función para eliminar un producto del carrito
            export const deleteCartItem = async (id_cliente: number, id_carrito: number): Promise<any> => {
                try {
                    const [result] = await pool.query(
                        'DELETE FROM carrito WHERE id_cliente = ? AND id_carrito = ?',
                        [id_cliente, id_carrito]
                    );
                    return result;
                } catch (error) {
                    throw error;
                }
            };

            // Función para obtener los productos del carrito de un usuario
            export const getCartItems = async (id_cliente: number): Promise<CartItem[]> => {
                try {
                    const [rows] = await pool.query(
                        'SELECT id_carrito, nombre, imagen, precio, cantidad, sub_total, total FROM carrito WHERE id_cliente = ? AND estado = ?',
                        [id_cliente, 'pendiente']
                    );
                    return rows as CartItem[];
                } catch (error) {
                    throw error;
                }
            };
