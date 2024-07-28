import { MedicamentoModel } from '../models/medicamento.js';

export class MedicamentoController {

   static async vista (req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) {
         const medicamentos = await MedicamentoModel.obtenerMedicamentos();
         const nombres = await MedicamentoModel.obtenerNombres();
         const categorias = await MedicamentoModel.obtenerCategorias();
         const familias = await MedicamentoModel.obtenerFamilias();
         const concentraciones = await MedicamentoModel.obtenerConcentraciones();
         const formafarmaceuticas = await MedicamentoModel.obtenerFormasFarmaceuticas();
         const presentaciones = await MedicamentoModel.obtenerPresentaciones();
         res.render('medicamento', { medicamentos, nombres, categorias, familias, concentraciones, formafarmaceuticas, presentaciones, session: req.session });
      }
   }

   static async agregarMedicamento (req, res) { // 🟢
      const { idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion } = req.body;
      const nuevoMedicamento = await MedicamentoModel.agregarMedicamento(idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion);
      if (nuevoMedicamento) {
         res.send({ message: 'Medicamento agregado exitosamente', idMedicamento: nuevoMedicamento });
      } else {
         res.status(500).json({ message: 'Error al registrar el medicamento' });
      }
   }

   static async obtenerMedicamento (req, res) { // 🟢
      const { id } = req.params;
      const medicamento = await MedicamentoModel.obtenerMedicamento(id);
      if (!medicamento) res.status(404).json({ message: 'Medicamento no encontrado' });
      res.send(medicamento);
   }

   static async editarMedicamento (req, res) { // 🟢
      const { id, idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion } = req.body;
      const medicamentoActualizado = await MedicamentoModel.editarMedicamento(id, idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion);
      if (medicamentoActualizado) {
         res.send({ message: 'Medicamento actualizado exitosamente' });
      } else {
         res.status(500).json({ message: 'Error al actualizar el medicamento' });
      }
   }

   static async habilitarMedicamento (req, res) { // 🟢
      const { id } = req.body;
      const habilitado = await MedicamentoModel.habilitarMedicamento(id);
      if (habilitado) {
         res.send({ message: 'Medicamento habilitado con éxito' });
      } else {
         res.status(500).json({ message: 'Error al habilitar el medicamento' });
      }
   }

   static async deshabilitarMedicamento (req, res) { // 🟢
      const { id } = req.body;
      const deshabilitado = await MedicamentoModel.deshabilitarMedicamento(id);
      if (deshabilitado) {
         res.send({ message: 'Medicamento deshabilitado con éxito' });
      } else {
         res.status(500).json({ message: 'Error al deshabilitar el medicamento' });
      }
   }

   static async agregarNombre (req, res) { // 🟢
      const { nombre } = req.body;
      const idNombre = await MedicamentoModel.agregarNombre(nombre);
      if (idNombre) {
         res.send({ message: 'Nombre agregado exitosamente', nombre: { id: idNombre, nombregenerico: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar el nombre' });
      }
   }

   static async agregarConcentracion (req, res) { // 🟢
      const { nombre } = req.body;
      const idConcentracion = await MedicamentoModel.agregarConcentracion(nombre);
      if (idConcentracion) {
         res.send({ message: 'Concentración agregada exitosamente', concentracion: { id: idConcentracion, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la concentración' });
      }
   }

   static async agregarFormaFarmaceutica (req, res) { // 🟢
      const { nombre } = req.body;
      const idFormafarmaceutica = await MedicamentoModel.agregarFormaFarmaceutica(nombre);
      if (idFormafarmaceutica) {
         res.send({ message: 'Forma farmacéutica agregada exitosamente', formafarmaceutica: { id: idFormafarmaceutica, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la forma farmacéutica' });
      }
   }

   static async agregarPresentacion (req, res) { // 🟢
      const { nombre } = req.body;
      const idPresentacion = await MedicamentoModel.agregarPresentacion(nombre);
      if (idPresentacion) {
         res.send({ message: 'Presentación agregada exitosamente', presentacion: { id: idPresentacion, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la presentación' });
      }
   }

   static async agregarCategoria (req, res) { // 🟢
      const { nombre } = req.body;
      const idCategoria = await MedicamentoModel.agregarCategoria(nombre);
      if (idCategoria) {
         res.send({ message: 'Categoría agregada exitosamente', categoria: { id: idCategoria, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la categoría' });
      }
   }

   static async agregarFamilia (req, res) { // 🟢
      const { nombre } = req.body;
      const idFamilia = await MedicamentoModel.agregarFamilia(nombre);
      if (idFamilia) {
         res.send({ message: 'Familia agregada exitosamente', familia: { id: idFamilia, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la familia' });
      }
   }

}