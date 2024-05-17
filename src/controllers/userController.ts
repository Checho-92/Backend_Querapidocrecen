import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { pool } from '../database'; // Asegúrate de importar la configuración de tu base de datos aquí

const registerUser = (req: Request, res: Response) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body; // Obtiene los datos del cuerpo de la solicitud
  
    // Verifica que la contraseña y la confirmación de la contraseña coincidan
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' });
    }
  
    // Inserta los datos del usuario en la base de datos
    pool.query(
      'INSERT INTO usuarios (nombre, apellido, correo, password, tipo_usuario) VALUES (50, 50, 50, 50, 50)',
      [firstName, lastName, email, password, 'cliente'],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(200).json({ message: 'Usuario registrado correctamente' });
      }
    );
  };
  
  export { registerUser };