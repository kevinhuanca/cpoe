import express from 'express';
import { PrescripcionController } from '../controllers/prescripcion.js';

export const prescripcionesRouter = express.Router();

prescripcionesRouter.get('/', PrescripcionController.vista) // 🟢