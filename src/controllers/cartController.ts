import { Request, Response } from 'express';
import { pool } from '../database';
import { RowDataPacket } from 'mysql2/promise';

// Función para verificar permisos
const hasPermission = async (userId: number, permission: string): Promise<boolean> => {
  const [rows]: [RowDataPacket[], any] = await pool.query(
    'SELECT * FROM permisos WHERE id_usuario = ? AND permiso = ?',
    [userId, permission]
  );
  return rows.length > 0;
};

// Función para obtener productos por categoría
const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM producto WHERE categoria = ?', [category]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para agregar un producto al carrito
const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  try {
    if (await hasPermission(userId, 'add_to_cart')) {
      const [productRows]: [RowDataPacket[], any] = await pool.query('SELECT nombre, precio, imagen FROM producto WHERE id_producto = ?', [productId]);
      if (productRows.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      const product = productRows[0];
      const price = product.precio;
      const subTotal = price * quantity;
      const total = subTotal; // Puedes agregar lógica adicional si hay descuentos o impuestos

      const [result]: [any, any] = await pool.query(
        'INSERT INTO carrito (id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, productId, price, quantity, subTotal, total, 'pendiente', product.nombre, product.imagen]
      );

      res.status(200).json({ message: 'Artículo agregado al carrito correctamente', result });
    } else {
      res.status(403).json({ message: 'No tienes permisos para agregar al carrito' });
    }
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para obtener los artículos del carrito de un usuario
const getCartItems = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const [rows]: [RowDataPacket[], any] = await pool.query(
      'SELECT c.id_carrito, c.nombre, c.imagen, c.precio, c.cantidad, c.sub_total, c.total FROM carrito c WHERE c.id_cliente = ? AND c.estado = ?',
      [userId, 'pendiente']
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los artículos del carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { getProductsByCategory, addToCart, getCartItems };
