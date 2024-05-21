"use strict";
//import express from 'express';
//import bodyParser from 'body-parser';
//import cors from 'cors'; // Importa cors
//import userRoutes from './routes/userRutes';
////import { pool } from './database';
//import dotenv from 'dotenv';
//
//dotenv.config();
//
//pool.getConnection((err, connection) => {
//    if (err) {
//        console.error('Error al conectar con la base de datos:', err);
//    } else {
//        console.log('¡Conexión exitosa a la base de datos!');
//        connection.release();
//    }
//});
//
//const app = express();
//
//// Middleware para registrar todas las solicitudes
//app.use((req, res, next) => {
//    console.log(`${req.method} ${req.path}`);
//    console.log('Headers:', req.headers);
//    next();
//});
//
//// Middleware para habilitar CORS
//app.use(cors({
//    origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
//    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//    allowedHeaders: ['Content-Type', 'Authorization'],
//    credentials: true
//}));
//
//app.use(bodyParser.json());
//app.use('/api/register', userRoutes);
//
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
//    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
//});
//
