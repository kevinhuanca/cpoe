import connection from "./db.js";

export class ProfesionalModel {

   static async agregarProfesional(nombre, apellido, documento, domicilio, matricula, refeps, estado, idProfesion, idUsuario) { // 🟢
      const [result] = await connection.execute(
         'INSERT INTO profesional (nombre, apellido, documento, domicilio, matricula, refeps, estado, id_profesion, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [nombre, apellido, documento, domicilio, matricula, refeps, estado, idProfesion, idUsuario]
      );
      return result.insertId;
   }

   static async agregarProfesionalEspecialidad(idProfesional, idEspecialidad) { // 🟢
      const [result] = await connection.execute(`
         INSERT INTO profesional_especialidad(
            id_profesional, 
            id_especialidad
         )
         VALUES(?, ?)`,
         [idProfesional, idEspecialidad]
      );
      return result.insertId;
   }

   static async obtenerEspecialidadesPorProfesional(id) { // 🟢
      const [especialidades] = await connection.execute('SELECT * FROM profesional_especialidad WHERE id_profesional = ?', [id]);
      return especialidades;
   }
   
   static async obtenerProfesionalPorId(id) { // 🟢
      const [profesional] = await connection.execute(`SELECT * FROM profesional WHERE id = ?`, [id]);
      return profesional[0];
   }
   
   static async obtenerProfesionales() { // 🟢
      const [profesionales] = await connection.execute(`SELECT * FROM profesional`);
      return profesionales;
   }
         
   static async obtenerProfesionalPorIdUsuario(id) { // 🟢
      const [profesional] = await connection.execute('SELECT * FROM profesional WHERE id_usuario = ?', [id]);
      return profesional[0];
   }
   
   static async obtenerProfesiones() { // 🟢
      const [profesiones] = await connection.execute('SELECT * FROM profesion ORDER BY nombre;');
      return profesiones;
   }

   static async obtenerProfesionPorId(id) { // 🟢
      const [profesion] = await connection.execute('SELECT * FROM profesion WHERE id = ?', [id]);
      return profesion[0];
   }
   
   static async obtenerEspecialidades() { // 🟢
      const [especialidades] = await connection.execute('SELECT * FROM especialidad ORDER BY nombre;');
      return especialidades;
   }

   static async obtenerEspecialidadPorId(id) { // 🟢
      const [especialidad] = await connection.execute('SELECT * FROM especialidad WHERE id = ?', [id]);
      return especialidad[0];
   }

   static async editarProfesional(id, nombre, apellido, documento, domicilio, matricula, refeps, idProfesion) { // 🟢
      const [result] = await connection.execute(
         'UPDATE profesional SET nombre = ?, apellido = ?, documento = ?, domicilio = ?, matricula = ?, refeps = ?, id_profesion = ? WHERE id = ?',
         [nombre, apellido, documento, domicilio, matricula, refeps, idProfesion, id]
      );
      return result.affectedRows;
   }

   static async eliminarProfesionalEspecialidad(id) { // 🟢
      const [result] = await connection.execute('DELETE FROM profesional_especialidad WHERE id_profesional = ?', [id]);
      return result.affectedRows;
   }
   
   static async habilitarProfesional(id) { // 🟢
      const [result] = await connection.execute('UPDATE profesional SET estado = 1 WHERE id = ?', [id]);
      return result.affectedRows;
   }
   
   static async deshabilitarProfesional(id) { // 🟢
      const [result] = await connection.execute('UPDATE profesional SET estado = 0 WHERE id = ?', [id]);
      return result.affectedRows;
   }

   static async agregarProfesion(nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO profesion (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }

   static async agregarEspecialidad(nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO especialidad (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }
   
}