"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Simula una solicitud HTTP con datos de prueba
const req = {
    body: {
        firstName: 'Carlos',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123'
    },
    query: {}, // Puedes agregar otras propiedades según sea necesario
    params: {},
    headers: {}
};
// Simula el objeto de respuesta
const res = {
    status: (statusCode) => ({
        json: (data) => console.log(`Status ${statusCode}:`, data)
    })
};
// Ejecuta la función registerUser con la solicitud y la respuesta simuladas
registerUser(req, res);
