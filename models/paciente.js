import connection from "./db.js";

export class PacienteModel {

   static async obtenerPacientes() { // 🟢
      const [pacientes] = await connection.execute(`SELECT * FROM paciente`);
      return pacientes;
   }

   static async agregarPaciente(nombre, apellido, documento, nacimiento, sexo) { // 🟢
      const [result] = await connection.execute('INSERT INTO paciente (nombre, apellido, documento, nacimiento, sexo) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, documento, nacimiento, sexo]);
      return result.insertId;
   }

   static async obtenerPacientePorDocumento({ documento }) { // 🟢
      const [paciente] = await connection.execute(`SELECT * FROM paciente WHERE documento = ?`, [documento]);
      return paciente[0];
   }

}