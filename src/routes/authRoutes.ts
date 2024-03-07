import { Router, Request, Response } from 'express';
import authController from './authController';
class AuthRoutes {
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config(){
        this.router.post('/', authController.iniciarSesion); 
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;