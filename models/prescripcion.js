import connection from "./db.js";

export class PrescripcionModel {

   static async obtenerPrescripcionesPorPaciente(idPaciente) { // 🟢
      const [prescripciones] = await connection.execute(`
         SELECT * FROM prescripcion
         WHERE id_paciente = ?
      `, [idPaciente]);
      return prescripciones;
   }

   static async obtenerMedicamentosPorPrescripcion(idPrescripcion) { // 🟢
      const [medicamentos] = await connection.execute(`
         SELECT * FROM prescripcion_medicamento
         WHERE id_prescripcion = ?
      `, [idPrescripcion]);
      return medicamentos;
   }

   static async obtenerPrestacionesPorPrescripcion(idPrescripcion) { // 🟢
      const [prestaciones] = await connection.execute(`
         SELECT * FROM prescripcion_prestacion
         WHERE id_prescripcion = ?
      `, [idPrescripcion]);
      return prestaciones;
   }

   static async obtenerIdPlanPorPrescripcion(idPrescripcion) { // 🟢
      const [plan] = await connection.execute(`
         SELECT * FROM prescripcion_plan
         WHERE id_prescripcion = ?
      `, [idPrescripcion]);
      return plan[0];
   }

   static async agregarPrescripcion(fecha, vigencia, diagnostico, idProfesional, idPaciente) { // 🟢
      const [result] = await connection.execute(`
         INSERT INTO prescripcion(
            fecha,
            vigencia,
            diagnostico,
            id_profesional,
            id_paciente
         )
         VALUES(?, ?, ?, ?, ?)
      `, [fecha, vigencia, diagnostico, idProfesional, idPaciente]);
      return result.insertId;
   }

   static async agregarPrescripcionMedicamento(idPrescripcion, idMedicamento, nombreComercial, dosis, duracion) { // 🟢
      const [result] = await connection.execute(`
         INSERT INTO prescripcion_medicamento(
            id_prescripcion,
            id_medicamento,
            nombrecomercial,
            dosis,
            duracion
         )
         VALUES(?, ?, ?, ?, ?)
      `, [idPrescripcion, idMedicamento, nombreComercial, dosis, duracion]);
      return result.insertId;
   }

   static async agregarPrescripcionPrestacion(idPrescripcion, idPrestacion, lado, indicacion, justificacion, resultado) { // 🟢
      const [result] = await connection.execute(`
         INSERT INTO prescripcion_prestacion(
            id_prescripcion,
            id_prestacion,
            lado,
            indicacion,
            justificacion,
            resultado
         )
         VALUES(?, ?, ?, ?, ?, ?)
      `, [idPrescripcion, idPrestacion, lado, indicacion, justificacion, resultado]);
      return result.insertId;
   }

   static async agregarPrescripcionPlan(idPrescripcion, idPlan) { // 🟢
      const [result] = await connection.execute(`
         INSERT INTO prescripcion_plan(
            id_prescripcion,
            id_plan
         )
         VALUES(?, ?)
      `, [idPrescripcion, idPlan]);
      return result.insertId;
   }

}