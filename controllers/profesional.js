import { ProfesionalModel } from "../models/profesional.js";
import { UsuarioModel } from "../models/usuario.js";
import bcrypt from 'bcrypt';

export class ProfesionalController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (req.session.rol === 1) {
         const profesionales = await ProfesionalModel.obtenerProfesionales();

         if (profesionales.length > 0) {
            for (const profesional of profesionales) {
               const profesion = await ProfesionalModel.obtenerProfesionPorId(profesional.id_profesion);
               profesional.profesion = profesion;
               delete profesional.id_profesion;
               
               const especialidades = await ProfesionalModel.obtenerEspecialidadesPorProfesional(profesional.id);
               if (especialidades.length > 0) {
                  for (const especialidad of especialidades) {
                     const tablaEspecialidad = await ProfesionalModel.obtenerEspecialidadPorId(especialidad.id_especialidad);
                     especialidad.id = tablaEspecialidad.id;
                     especialidad.nombre = tablaEspecialidad.nombre;
                     delete especialidad.id_profesional;
                     delete especialidad.id_especialidad;
                  }
                  profesional.especialidades = especialidades;
               } else { profesional.especialidades = null; }
            }  
         } else { profesionales = null; }

         const profesiones = await ProfesionalModel.obtenerProfesiones();
         const especialidades = await ProfesionalModel.obtenerEspecialidades();
         res.render('profesional', { profesionales, profesiones, especialidades, session: req.session });
      }
   }

   static async agregarProfesional(req, res) { // 🟢
      const { nombre, apellido, documento, domicilio, idProfesion, idEspecialidades, matricula, refeps, idUsuario } = req.body;
      const idProfesional = await ProfesionalModel.agregarProfesional(nombre, apellido, documento, domicilio, matricula, refeps, 1, idProfesion, idUsuario);
      
      if (idProfesional) {
         if (idEspecialidades) {
            for (const idEspecialidad of idEspecialidades) {
               await ProfesionalModel.agregarProfesionalEspecialidad(idProfesional, idEspecialidad);
            }
         }
         res.send({ message: 'Profesional agregado exitosamente', idProfesional: idProfesional });
      } else {
         res.status(500).json({ message: 'Error al registrar el profesional' });
      }
   }

   static async obtenerProfesionalPorId(req, res) { // 🟢
      const { id } = req.params;
      const profesional = await ProfesionalModel.obtenerProfesionalPorId(id);

      if (profesional) {
         const profesion = await ProfesionalModel.obtenerProfesionPorId(profesional.id_profesion);
         profesional.profesion = profesion;
         delete profesional.id_profesion;

         const especialidades = await ProfesionalModel.obtenerEspecialidadesPorProfesional(id);
         if (especialidades.length > 0) {
            for (const especialidad of especialidades) {
               const tablaEspecialidad = await ProfesionalModel.obtenerEspecialidadPorId(especialidad.id_especialidad);
               especialidad.id = tablaEspecialidad.id;
               especialidad.nombre = tablaEspecialidad.nombre;
               delete especialidad.id_profesional;
               delete especialidad.id_especialidad;
            }
            profesional.especialidades = especialidades;
         } else { profesional.especialidades = null; }

         res.json(profesional);
      } else {
         res.status(404).json({ message: 'Profesional no encontrado' });
      }
   }

   static async editarProfesional(req, res) { // 🟢
      const { id, nombre, apellido, documento, domicilio, idProfesion, idEspecialidades, matricula, refeps} = req.body;
      const actualizado = await ProfesionalModel.editarProfesional(id, nombre, apellido, documento, domicilio, matricula, refeps, idProfesion);
      if (actualizado) {
         if (idEspecialidades) {
            await ProfesionalModel.eliminarProfesionalEspecialidad(id);
            for (const idEspecialidad of idEspecialidades) {
               await ProfesionalModel.agregarProfesionalEspecialidad(id, idEspecialidad);
            }
         } else { await ProfesionalModel.eliminarProfesionalEspecialidad(id); }

         const profesional = await ProfesionalModel.obtenerProfesionalPorId(id);
         if (profesional.documento !== documento) {
            const claveHasheada = await bcrypt.hash(documento, 10);
            await UsuarioModel.actualizarUsuario(profesional.id_usuario, documento, claveHasheada);
         }

         res.send({ message: 'Profesional actualizado exitosamente' });
      } else {
         res.status(500).json({ message: 'Error al actualizar el profesional' });
      }
   }

   static async habilitarProfesional(req, res) { // 🟢
      const { id } = req.body;
      const habilitado = await ProfesionalModel.habilitarProfesional(id);
      if (habilitado) {
         const profesional = await ProfesionalModel.obtenerProfesionalPorId(id);
         const usuario = await UsuarioModel.obtenerUsuarioPorId(profesional.id_usuario);
         await UsuarioModel.habilitarUsuario(usuario.id);
         res.send({ message: 'Profesional y Usuario habilitado con exito' });
      } else {
         res.status(500).json({ message: 'Error al habilitar el profesional' });
      }
   }

   static async deshabilitarProfesional(req, res) { // 🟢
      const { id } = req.body;
      const deshabilitado = await ProfesionalModel.deshabilitarProfesional(id);
      if (deshabilitado) {
         const profesional = await ProfesionalModel.obtenerProfesionalPorId(id);
         const usuario = await UsuarioModel.obtenerUsuarioPorId(profesional.id_usuario);
         await UsuarioModel.deshabilitarUsuario(usuario.id);
         res.send({ message: 'Profesional y Usuario deshabilitado con exito' });
      } else {
         res.status(500).json({ message: 'Error al deshabilitar el profesional' });
      }
   }

   static async agregarProfesion(req, res) { // 🟢
      const { nombre } = req.body;
      const idProfesion = await ProfesionalModel.agregarProfesion(nombre);
      if (idProfesion) {
         res.send({ message: 'Profesion agregada exitosamente', profesion: { id: idProfesion, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la profesion' });
      }
   }

   static async agregarEspecialidad(req, res) { // 🟢
      const { nombre } = req.body;
      const idEspecialidad = await ProfesionalModel.agregarEspecialidad(nombre);
      if (idEspecialidad) {
         res.send({ message: 'Especialidad agregada exitosamente', especialidad: { id: idEspecialidad, nombre: nombre } });
      } else {
         res.status(500).json({ message: 'Error al registrar la especialidad' });
      }
   }

}