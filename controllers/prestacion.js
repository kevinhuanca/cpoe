import { PrestacionModel } from "../models/prestacion.js";

export class PrestacionController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) {
         const prestaciones = await PrestacionModel.obtenerPrestaciones();
         prestaciones.sort((a, b) => a.nombre.localeCompare(b.nombre));
         res.render('prestacion', { prestaciones });
      }
   }

   static async agregarPrestacion(req, res) { // 🟢
      const { nombre } = req.body;
      const idPrestacion = await PrestacionModel.agregarPrestacion(nombre);
      if (idPrestacion) {
         res.send({ message: 'Prestación registrada exitosamente', idPrestacion });
      } else {
         res.status(500).json({ message: 'Error al registrar la prestación' });
      }
   }


}