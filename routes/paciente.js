import express from 'express';
import { PacienteController } from '../controllers/paciente.js';

export const pacientesRouter = express.Router();

pacientesRouter.get('/', PacienteController.vista); // 🟢
pacientesRouter.post('/agregar', PacienteController.agregarPaciente); // 🟢