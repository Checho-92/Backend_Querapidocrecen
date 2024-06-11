import { Request, Response } from 'express'; // Importación de las interfaces Request y Response de Express
import jwt from 'jsonwebtoken'; // Importación del módulo jsonwebtoken para generar y verificar tokens JWT
import { pool } from '../database'; // Importación del pool de conexiones a la base de datos
import bcrypt from 'bcrypt'; // Importación del módulo bcrypt para el manejo de contraseñas (hashing y verificación)
import { RowDataPacket } from 'mysql2'; // Importación de la interfaz RowDataPacket de mysql2 para manejar resultados de consultas

// Función asíncrona para manejar el inicio de sesión
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body; // Obtención de las credenciales (email y contraseña) del cuerpo de la solicitud

  try {
    // Consulta a la base de datos para obtener el usuario con el correo proporcionado
    const [results] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE correo = ?',
      [email]
    );

    // Verificación si no se encontró ningún usuario con el correo proporcionado
    if (results.length === 0) {
      res.status(401).json({ message: 'Credenciales incorrectas' }); // Respuesta con estado 401 (no autorizado) y mensaje de credenciales incorrectas
      return;
    }

    const user = results[0]; // Obtención del primer (y único) usuario de los resultados
    // Comparación de la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Verificación si la contraseña no es válida
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciales incorrectas' }); // Respuesta con estado 401 (no autorizado) y mensaje de credenciales incorrectas
      return;
    }

    // Generación de un token JWT con el ID del usuario, válido por 1 hora
    const token = jwt.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });

    // Respuesta con estado 200 (éxito), token generado y datos del usuario
    res.status(200).json({ token, user: { id: user.id_usuario, nombre: user.nombre } });
  } catch (error) {
    console.error(error); // Impresión del error en consola para propósitos de depuración
    res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta con estado 500 (error interno del servidor) y mensaje de error
  }
};

export { login }; // Exportación de la función login para que pueda ser utilizada en otros módulos
