import { PacienteModel } from "../models/paciente.js";

export class PacienteController {

   static async vista (req, res) {
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) res.render('paciente');
   }
}