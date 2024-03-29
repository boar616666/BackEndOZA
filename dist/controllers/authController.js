"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const validator_1 = __importDefault(require("validator"));
const authModelo_1 = __importDefault(require("../models/authModelo"));
class AuthControllerInstance {
    /**
     * Método para valida Inicio de sesión
     * @param req Petición
     * @param res respuesta
     * @returns
     */
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Verificar que los datos no estén vacíos
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim())) {
                    return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
                }
                // Consultar la base de datos para obtener el usuario por correo electrónico
                const lstUsers = yield authModelo_1.default.getuserByEmail(email);
                if (lstUsers.length <= 0) {
                    // El usuario no fue encontrado en la base de datos
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
                // Verificar si la contraseña coincide
                const user = lstUsers[0]; // Supongamos que el primer usuario es el único que coincide
                if (user.password !== password) {
                    // La contraseña no coincide
                    return res.status(401).json({ message: "El usuario y/o contraseña es incorrecto", code: 2 });
                }
                // Autenticación correcta
                return res.json({ message: "Autenticación correcta", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new AuthControllerInstance();
//# sourceMappingURL=authController.js.map