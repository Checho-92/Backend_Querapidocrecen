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

      const [existingCart]: [RowDataPacket[], any] = await pool.query('SELECT * FROM carrito WHERE id_cliente = ? AND id_producto = ? AND estado = ?', [userId, productId, 'pendiente']);

      if (existingCart.length > 0) {
        await pool.query(
          'UPDATE carrito SET cantidad = cantidad + ?, sub_total = sub_total + ?, total = total + ? WHERE id_cliente = ? AND id_producto = ? AND estado = ?',
          [quantity, subTotal, total, userId, productId, 'pendiente']
        );
      } else {
        await pool.query(
          'INSERT INTO carrito (id_cliente, id_producto, precio, cantidad, sub_total, total, estado, nombre, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, productId, price, quantity, subTotal, total, 'pendiente', product.nombre, product.imagen]
        );
      }

      res.status(200).json({ message: 'Artículo agregado al carrito correctamente' });
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

// Función para actualizar la cantidad de un producto en el carrito
const updateCartItem = async (req: Request, res: Response) => {
  const { userId, cartItemId, quantity } = req.body;
  try {
    const [cartItemRows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM carrito WHERE id_carrito = ? AND id_cliente = ? AND estado = ?', [cartItemId, userId, 'pendiente']);
    if (cartItemRows.length === 0) {
      return res.status(404).json({ message: 'Artículo del carrito no encontrado' });
    }
    const cartItem = cartItemRows[0];
    const subTotal = cartItem.precio * quantity;
    const total = subTotal;

    await pool.query(
      'UPDATE carrito SET cantidad = ?, sub_total = ?, total = ? WHERE id_carrito = ?',
      [quantity, subTotal, total, cartItemId]
    );

    res.status(200).json({ message: 'Cantidad actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la cantidad:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para eliminar un artículo del carrito
const deleteCartItem = async (req: Request, res: Response) => {
  const { userId, cartItemId } = req.body;
  try {
    await pool.query('DELETE FROM carrito WHERE id_carrito = ? AND id_cliente = ?', [cartItemId, userId]);
    res.status(200).json({ message: 'Artículo eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar el artículo del carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { getProductsByCategory, addToCart, getCartItems, updateCartItem, deleteCartItem };
