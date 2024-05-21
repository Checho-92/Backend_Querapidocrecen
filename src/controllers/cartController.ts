import { Request, Response } from 'express';
import { pool } from '../database'; // Importa el pool de conexiones a la base de datos

const addToCart = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId, quantity } = req.body; // Obtiene los datos del cuerpo de la solicitud

  try {
    // Inserta el artículo en el carrito en la base de datos
    await pool.query(
      'INSERT INTO carrito (id_cliente, id_producto, cantidad) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );

    res.status(200).json({ message: 'Artículo agregado al carrito correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { addToCart };
