import connection from "./db.js";

export class PrestacionModel {

   static async obtenerPrestacionPorId(id) { // 🟢
      const [prestacion] = await connection.execute('SELECT * FROM prestacion WHERE id = ?', [id]);
      return prestacion[0];
   }

   static async obtenerPrestaciones() { // 🟢
      const [prestaciones] = await connection.execute('SELECT * FROM prestacion');
      return prestaciones;
   }

   static async agregarPrestacion(prestacion) { // 🟢
      const [result] = await connection.execute('INSERT INTO prestacion (nombre, estado) VALUES (?, 1)', [prestacion]);
      return result.insertId;
   }

   static async editarPrestacion(id, prestacion) { // 🟢
      const [result] = await connection.execute('UPDATE prestacion SET nombre = ? WHERE id = ?', [prestacion, id]);
      return result.affectedRows;
   }

   static async habilitarPrestacion(id) { // 🟢
      const [result] = await connection.execute('UPDATE prestacion SET estado = 1 WHERE id = ?', [id]);
      return result.affectedRows;
   }
   
   static async deshabilitarPrestacion(id) { // 🟢
      const [result] = await connection.execute('UPDATE prestacion SET estado = 0 WHERE id = ?', [id]);
      return result.affectedRows;
   }

}