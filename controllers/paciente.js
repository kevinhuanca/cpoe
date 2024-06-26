import { PacienteModel } from "../models/paciente.js";

export class PacienteController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) {
         const pacientes = await PacienteModel.obtenerPacientes();
         res.render('paciente', { pacientes });
      }
   }

   static async agregarPaciente(req, res) { // 🟢
      const { nombre, apellido, documento, nacimiento, sexo } = req.body;
      const idPaciente = await PacienteModel.agregarPaciente(nombre, apellido, documento, nacimiento, sexo);
      if (idPaciente) {
         res.send({ message: 'Paciente registrada exitosamente', idPaciente });
      } else {
         res.status(500).json({ message: 'Error al registrar la paciente' });
      }
   }

}