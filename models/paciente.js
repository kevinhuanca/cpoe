import connection from "./db.js";

export class PacienteModel {
   static async obtenerPacientes() {
      const [pacientes] = await connection.execute(`SELECT * FROM paciente`);
      return pacientes;
   }


}