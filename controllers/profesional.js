import { ProfesionalModel } from "../models/profesional.js";
import bcrypt from 'bcrypt';

export class ProfesionalController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) {
         const profesionales = await ProfesionalModel.obtenerProfesionales();
         const profesiones = await ProfesionalModel.obtenerProfesiones();
         res.render('profesional', { profesionales, profesiones });
      }
   }

   static async obtenerEspecialidadesPorProfesion(req, res) { // 🟢
      const idProfesion = req.params.idProfesion;
      const especialidades = await ProfesionalModel.obtenerEspecialidadesPorProfesion(idProfesion);
      res.json(especialidades);
   }

   static async agregarProfesional(req, res) { // 🟢
      const { nombre, apellido, documento, domicilio, idEspecialidad, matricula, refeps, idUsuario } = req.body;
      const nuevoProfesional = await ProfesionalModel.agregarProfesional(nombre, apellido, documento, domicilio, matricula, refeps, 1, idEspecialidad, idUsuario);
      if (nuevoProfesional) {
         res.send({ message: 'Profesional agregado exitosamente', idProfesional: nuevoProfesional });
      } else {
         res.status(500).json({ message: 'Error al registrar el profesional' });
      }
   }

}