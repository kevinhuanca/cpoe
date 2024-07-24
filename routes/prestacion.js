import express from 'express';
import { PrestacionController } from '../controllers/prestacion.js';

export const prestacionesRouter = express.Router();

prestacionesRouter.get('/', PrestacionController.vista) // 🟢
prestacionesRouter.get('/:id', PrestacionController.obtenerPrestacionPorId) // 🟢
prestacionesRouter.post('/agregar', PrestacionController.agregarPrestacion) // 🟢
prestacionesRouter.put('/editar', PrestacionController.editarPrestacion) // 🟢
prestacionesRouter.put('/activar', PrestacionController.habilitarPrestacion) // 🟢
prestacionesRouter.put('/desactivar', PrestacionController.deshabilitarPrestacion) // 🟢