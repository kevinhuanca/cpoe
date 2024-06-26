import express from 'express';
import { ProfesionalController } from '../controllers/profesional.js';

export const profesionalesRouter = express.Router();

profesionalesRouter.get('/', ProfesionalController.vista) // 🟢
profesionalesRouter.get('/especialidades/:idProfesion', ProfesionalController.obtenerEspecialidadesPorProfesion) // 🟢
profesionalesRouter.post('/agregar', ProfesionalController.agregarProfesional) // 🟢