import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { pool } from './database';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('¡Conexión exitosa a la base de datos!');
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
    }
})();

const app = express();

// Middleware para registrar todas las solicitudes
//app.use((req, res, next) => {
    //console.log(`${req.method} ${req.path}`);
    //console.log('Headers:', req.headers);
    //next();
//});

// Middleware para habilitar CORS
// app.use(cors({
//     origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
app.use(cors())
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
