import { Request, Response } from 'express';
import { addUser, getUserByEmail } from '../models/userModel';

const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' });
        return;
    }
    
    const tipoUsuario = 'cliente';

    try {
        const verify:any = await getUserByEmail(email)
       
        if (verify.length > 0){ 
            res.status(500).json({ message: 'Usuario ya registrado' });
            return 
        }
    
        const user = {
            nombre: firstName,
            apellido: lastName,
            correo: email,
            password,
            tipo_usuario: tipoUsuario
        };

        const result = await addUser(user);
        res.status(201).json({ message: 'Usuario registrado correctamente', userId: result.insertId });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export { registerUser };
