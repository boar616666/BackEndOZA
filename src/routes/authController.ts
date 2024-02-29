import { Request, Response } from "express";

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        const { email, password } = req.body;
        return res.json({
            message: "Autenticación correcta",
            email: email,
            password: password
        });
    }
}

const authController = new AuthController();
export default authController;