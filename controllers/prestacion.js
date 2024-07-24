import { PrestacionModel } from "../models/prestacion.js";

export class PrestacionController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) {
         const prestaciones = await PrestacionModel.obtenerPrestaciones();
         res.render('prestacion', { prestaciones, session: req.session });
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

   static async obtenerPrestacionPorId(req, res) { // 🟢
      const { id } = req.params;
      const prestacion = await PrestacionModel.obtenerPrestacionPorId(id);
      if (prestacion) return res.json(prestacion);
      res.status(404).json({ message: 'Prestación no encontrada' });
   }

   static async editarPrestacion(req, res) { // 🟢
      const { id, nombre } = req.body;
      const actualizado = await PrestacionModel.editarPrestacion(id, nombre);
      if (actualizado) {
         res.send({ message: 'Prestación actualizada exitosamente' });
      } else {
         res.status(500).json({ message: 'Error al actualizar la prestación' });
      }
   }

   static async habilitarPrestacion(req, res) { // 🟢
      const { id } = req.body;
      const habilitado = await PrestacionModel.habilitarPrestacion(id);
      if (habilitado) {
         res.send({ message: 'Prestación habilitada con éxito' });
      } else {
         res.status(500).json({ message: 'Error al habilitar la prestación' });
      }
   }

   static async deshabilitarPrestacion(req, res) { // 🟢
      const { id } = req.body;
      const deshabilitado = await PrestacionModel.deshabilitarPrestacion(id);
      if (deshabilitado) {
         res.send({ message: 'Prestación deshabilitada con éxito' });
      } else {
         res.status(500).json({ message: 'Error al deshabilitar la prestación' });
      }
   }

}