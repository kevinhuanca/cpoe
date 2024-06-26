import connection from "./db.js";

export class ProfesionalModel {
   
   static async obtenerProfesionales() {
      const [profesionales] = await connection.execute('SELECT * FROM profesional');
      return profesionales;
   }

   static async obtenerProfesionalPorIdUsuario(id) { // 🟢
      const [profesional] = await connection.execute('SELECT * FROM profesional WHERE id_usuario = ?', [id]);
      return profesional[0];
   }

}