"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
//database.ts
const promise_1 = require("mysql2/promise");
const pool = (0, promise_1.createPool)({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'querapidocrecen_com',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.pool = pool;
