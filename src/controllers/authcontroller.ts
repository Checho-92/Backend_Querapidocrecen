// AuthController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from './database'; // Importa el pool de conexiones a la base de datos

const login = (req: Request, res: Response) => {
  const { email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud

  // Verifica las credenciales del usuario en la base de datos
  pool.query(
    'SELECT * FROM usuarios WHERE correo = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      // Genera un token de autenticación
      const token = jwt.sign({ userId: results[0].id_usuario }, 'your_secret_key', { expiresIn: '1h' });
      
      res.status(200).json({ token });
    }
  );
};

export { login };
