import { MedicamentoModel } from '../models/medicamento.js';

export class MedicamentoController {

   // async obtenerMedicamentos(req, res) {
   //    const medicamentos = await MedicamentoModel.obtenerMedicamentos();
   //    res.json(medicamentos);
   // }

   static async vista (req, res) {
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) res.render('medicamento');
   }

}