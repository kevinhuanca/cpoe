import connection from "./db.js";

export class ProfesionalModel {

   static async obtenerProfesionalPorId(id) {
      const [profesional] = await connection.execute(`SELECT * FROM profesional WHERE id = ?`, [id]);
      return profesional[0];
   }
   
   static async obtenerProfesionales() { // 🟢
      const [profesionales] = await connection.execute(`
         SELECT
            p.id,
            p.nombre,
            p.apellido,
            p.documento,
            p.domicilio,
            p.matricula,
            p.refeps,
            p.estado,
            especialidad.nombre AS especialidad,
            profesion.nombre AS profesion
         FROM
            profesional p
         JOIN especialidad ON p.id_especialidad = especialidad.id
         JOIN profesion ON especialidad.id_profesion = profesion.id
         WHERE
            p.estado = 1
      `);
      return profesionales;
   }

   static async obtenerProfesionalPorIdUsuario(id) { // 🟢
      const [profesional] = await connection.execute('SELECT * FROM profesional WHERE id_usuario = ?', [id]);
      return profesional[0];
   }

   static async obtenerEspecialidadesPorProfesion(idProfesion) { // 🟢
      const [especialidades] = await connection.execute('SELECT * FROM especialidad WHERE id_profesion = ?', [idProfesion]);
      return especialidades;
   }

   static async obtenerProfesiones() { // 🟢
      const [profesiones] = await connection.execute('SELECT * FROM profesion');
      return profesiones;
   }

   static async agregarProfesional(nombre, apellido, documento, domicilio, matricula, refeps, estado, idEspecialidad, idUsuario) { // 🟢
      const [result] = await connection.execute(
         'INSERT INTO profesional (nombre, apellido, documento, domicilio, matricula, refeps, estado, id_especialidad, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [nombre, apellido, documento, domicilio, matricula, refeps, estado, idEspecialidad, idUsuario]
      );
      return result.insertId;
   }

   static async obtenerEspecialidades() {
      const [especialidades] = await connection.execute('SELECT * FROM especialidad');
      return especialidades;
   }

   static async habilitarProfesional(id) {
      const [result] = await connection.execute('UPDATE profesional SET estado = 1 WHERE id = ?', [id]);
      return result.affectedRows;
   }

   static async deshabilitarProfesional(id) {
      const [result] = await connection.execute('UPDATE profesional SET estado = 0 WHERE id = ?', [id]);
      return result.affectedRows;
   }



}