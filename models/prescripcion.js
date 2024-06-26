import connection from "./db.js";

export class PrescripcionModel {
   static async obtenerPrescripciones() {
      const [prescripciones] = await connection.execute('SELECT * FROM prescripcion');
      return prescripciones;
   }

}