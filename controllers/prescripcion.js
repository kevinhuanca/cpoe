import { PrescripcionModel } from "../models/prescripcion.js";

export class PrescripcionController {
   
   static async vista(req, res) {
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 1) res.redirect('/pacientes');
      if (req.session.rol === 2) res.render('prescripcion');
   }

}