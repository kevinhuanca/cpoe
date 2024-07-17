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
      const [result] = await connection.execute('INSERT INTO prestacion (nombre) VALUES (?)', [prestacion]);
      return result.insertId;
   }

}