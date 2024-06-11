import { Request, Response } from 'express';
import { pool } from '../database'; // Asegúrate de importar pool correctamente

// Función para crear un nuevo pedido
const createOrder = async (req: Request, res: Response) => {
  const { id_cliente, direccion } = req.body;

  try {
    // Obtener los artículos del carrito del cliente
    const [cartItems]: any = await pool.query('SELECT * FROM carrito WHERE id_cliente = ? AND estado = ?', [id_cliente, 'pendiente']);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    // Crear un nuevo pedido
    const [orderResult]: any = await pool.query('INSERT INTO pedido (id_cliente, fecha, estado, direccion) VALUES (?, NOW(), ?, ?)', [id_cliente, 'pendiente', direccion]);
    const orderId = orderResult.insertId;

    // Insertar cada artículo del carrito en la tabla de detalles del pedido
    for (const item of cartItems) {
      await pool.query('INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio, nombre_producto) VALUES (?, ?, ?, ?, ?)', [orderId, item.id_producto, item.cantidad, item.precio, item.nombre]);
    }

    // Actualizar el estado de los artículos del carrito a 'completado'
    await pool.query('UPDATE carrito SET estado = ? WHERE id_cliente = ? AND estado = ?', ['completado', id_cliente, 'pendiente']);

    res.status(201).json({ message: 'Pedido creado correctamente' });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { createOrder };
