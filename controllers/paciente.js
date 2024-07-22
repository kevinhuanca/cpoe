import { PacienteModel } from "../models/paciente.js";

export class PacienteController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol) {
         const pacientes = await PacienteModel.obtenerPacientes();
         for (let i = 0; i < pacientes.length; i++) {
            pacientes[i].nacimiento = new Date(pacientes[i].nacimiento);
            pacientes[i].nacimiento = pacientes[i].nacimiento.toLocaleDateString('es-ES');
         }
         res.render('paciente', { pacientes, session: req.session });
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

   static async obtenerPacientePorDocumento(req, res) { // 🟢
      const { documento } = req.params;
      const paciente = await PacienteModel.obtenerPacientePorDocumento({ documento });
      
      if (paciente) {
         paciente.nacimiento = paciente.nacimiento.toLocaleDateString('es-ES');
         return res.json(paciente);
      }
      res.status(404).json({ message: 'No se encontro el paciente' });
   }

   static async editarPaciente(req, res) { // 🟢
      const { id } = req.params;
      const { nombre, apellido, documento, nacimiento, sexo } = req.body;
      const actualizado = await PacienteModel.editarPaciente(id, nombre, apellido, documento, nacimiento, sexo);
      if (actualizado) {
         res.send({ message: 'Paciente actualizada exitosamente' });
      } else {
         res.status(500).json({ message: 'Error al actualizar la paciente' });
      }
   }

}