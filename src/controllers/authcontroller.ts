import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../database'; // Importa el pool de conexiones a la base de datos
import { RowDataPacket } from 'mysql2'; // Importa el tipo RowDataPacket

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud

  try {
    // Verifica las credenciales del usuario en la base de datos
    const [results] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE correo = ? AND password = ?',
      [email, password]
    );

    if (results.length === 0) { // Verifica si no hay resultados o si el array de resultados está vacío
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    // Genera un token de autenticación
    const user = results[0];
    const token = jwt.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user.id_usuario, nombre: user.nombre } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { login };
