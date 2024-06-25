import express from 'express';
import { MedicamentoController } from '../controllers/medicamento.js';

export const medicamentosRouter = express.Router();

medicamentosRouter.get('/', MedicamentoController.vista);