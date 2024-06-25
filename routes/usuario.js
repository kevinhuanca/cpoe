import express from 'express';
import { UsuarioController } from '../controllers/usuario.js';

export const accesoRouter = express.Router();

accesoRouter.get('/', UsuarioController.vista) // 🟢
accesoRouter.post('/registrar/administrador', UsuarioController.registrarAdministrador) // 🟢
accesoRouter.post('/registrar/profesional', UsuarioController.registrarProfesional) // 🟢
accesoRouter.post('/entrar', UsuarioController.entrar)
accesoRouter.get('/salir', UsuarioController.salir)