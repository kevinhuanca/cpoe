import express from 'express';
import { MedicamentoController } from '../controllers/medicamento.js';

export const medicamentosRouter = express.Router();

medicamentosRouter.get('/', MedicamentoController.vista); // 🟢
medicamentosRouter.get('/:id', MedicamentoController.obtenerMedicamento); // 🟢
medicamentosRouter.post('/agregar', MedicamentoController.agregarMedicamento); // 🟢
medicamentosRouter.put('/editar', MedicamentoController.editarMedicamento); // 🟢
medicamentosRouter.put('/activar', MedicamentoController.habilitarMedicamento); // 🟢
medicamentosRouter.put('/desactivar', MedicamentoController.deshabilitarMedicamento); // 🟢

medicamentosRouter.post('/nombre/agregar', MedicamentoController.agregarNombre); // 🟢
medicamentosRouter.post('/concentracion/agregar', MedicamentoController.agregarConcentracion); // 🟢
medicamentosRouter.post('/formafarmaceutica/agregar', MedicamentoController.agregarFormaFarmaceutica); // 🟢
medicamentosRouter.post('/presentacion/agregar', MedicamentoController.agregarPresentacion); // 🟢
medicamentosRouter.post('/categoria/agregar', MedicamentoController.agregarCategoria); // 🟢
medicamentosRouter.post('/familia/agregar', MedicamentoController.agregarFamilia); // 🟢