import { Request, Response } from "express";
import validator from "validator";
import model from '../models/authModelo';
class AuthControllerInstance {
    /**
     * Método para valida Inicio de sesión
     * @param req Petición
     * @param res respuesta
     * @returns
     */
    public async iniciarSesion(req: Request, res: Response) {
        
        try {
            const { email, password } = req.body;
    
            // Verificar que los datos no estén vacíos
            if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
                return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
            }
    
            // Consultar la base de datos para obtener el usuario por correo electrónico
            const lstUsers = await model.getuserByEmail(email);
    
            if (lstUsers.length <= 0) {
                // El usuario no fue encontrado en la base de datos
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }
    
            // Verificar si la contraseña coincide
            const user = lstUsers[0];  // Supongamos que el primer usuario es el único que coincide
    
            if (user.password !== password) {
                // La contraseña no coincide
                return res.status(401).json({ message: "El usuario y/o contraseña es incorrecto", code: 2 });
            }
    
            // Autenticación correcta
            return res.json({ message: "Autenticación correcta", code: 0 });
    
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}
export const authController = new AuthControllerInstance();


