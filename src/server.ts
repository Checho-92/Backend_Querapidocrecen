import express from 'express';
import { json } from 'body-parser';
import { registerUser } from './controllers/userController'; // Importa el controlador de usuario

// Crea una instancia de Express
const app = express();

// Middleware para analizar JSON en las solicitudes
app.use(json());

// Ruta para el registro de usuarios
app.post('/register', registerUser);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
