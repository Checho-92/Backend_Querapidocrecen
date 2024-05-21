import dotenv from 'dotenv';
import { addUser } from './models/userModel';

// Cargar las variables de entorno
dotenv.config();

(async () => {
    const user = {
        nombre: 'Noah',
        apellido: 'Marin',
        correo: 'ejemplocorreo@gmail.com',
        password: 'Noah',
        tipo_usuario: 'cliente'
    };

    try {
        const result = await addUser(user);
        console.log('Usuario registrado correctamente:', result);
    } catch (error) {
        console.error('Error registrando usuario:', error);
    }
})();
