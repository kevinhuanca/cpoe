import express from 'express';
import { ProfesionalController } from '../controllers/profesional.js';

export const profesionalesRouter = express.Router();

profesionalesRouter.get('/', ProfesionalController.vista) // 🟢
profesionalesRouter.get('/:id', ProfesionalController.obtenerProfesionalPorId) // 🟢
profesionalesRouter.post('/agregar', ProfesionalController.agregarProfesional) // 🟢
profesionalesRouter.put('/editar', ProfesionalController.editarProfesional) // 🟢
profesionalesRouter.put('/activar', ProfesionalController.habilitarProfesional) // 🟢
profesionalesRouter.put('/desactivar', ProfesionalController.deshabilitarProfesional) // 🟢

profesionalesRouter.post('/profesion/agregar', ProfesionalController.agregarProfesion) // 🟢
profesionalesRouter.post('/especialidad/agregar', ProfesionalController.agregarEspecialidad) // 🟢