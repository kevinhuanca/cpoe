import express from 'express';
import { PrestacionController } from '../controllers/prestacion.js';

export const prestacionesRouter = express.Router();

prestacionesRouter.get('/', PrestacionController.vista) // 🟢
prestacionesRouter.post('/agregar', PrestacionController.agregarPrestacion) // 🟢