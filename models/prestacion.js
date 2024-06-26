import connection from "./db.js";

export class PrestacionModel {

   static async obtenerPrestaciones() { // 🟢
      const [prestaciones] = await connection.execute('SELECT * FROM prestacion');
      return prestaciones;
   }

   static async agregarPrestacion(prestacion) { // 🟢
      const [result] = await connection.execute('INSERT INTO prestacion (nombre) VALUES (?)', [prestacion]);
      return result.insertId;
   }

}