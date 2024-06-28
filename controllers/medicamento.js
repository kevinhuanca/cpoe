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

         medicamentos.sort((a, b) => a.nombre.localeCompare(b.nombre));
         nombres.sort((a, b) => a.nombregenerico.localeCompare(b.nombregenerico));
         categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
         familias.sort((a, b) => a.nombre.localeCompare(b.nombre));
         concentraciones.sort((a, b) => a.nombre.localeCompare(b.nombre));
         formafarmaceuticas.sort((a, b) => a.nombre.localeCompare(b.nombre));
         presentaciones.sort((a, b) => a.nombre.localeCompare(b.nombre));

         res.render('medicamento', { medicamentos, nombres, categorias, familias, concentraciones, formafarmaceuticas, presentaciones });
      }
   }

   static async agregarMedicamento (req, res) { // 🟢
      const { idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion } = req.body;
      const nuevoMedicamento = await MedicamentoModel.agregarMedicamento(idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion, 1);
      if (nuevoMedicamento) {
         res.send({ message: 'Medicamento agregado exitosamente', idMedicamento: nuevoMedicamento });
      } else {
         res.status(500).json({ message: 'Error al registrar el medicamento' });
      }
   }

}