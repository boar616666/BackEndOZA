"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("./authController"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', authController_1.default.iniciarSesion);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRoutes.js.map