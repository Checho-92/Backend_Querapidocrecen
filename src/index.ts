//index.ts

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
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

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
