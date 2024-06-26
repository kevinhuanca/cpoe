import connection from './db.js';

export class MedicamentoModel {

   static async obtenerMedicamentos() {
      const [medicamentos] = await connection.execute(`
         SELECT
            medicamento.id,
            nombre.nombregenerico AS nombre,
            categoria.nombre AS categoria,
            familia.nombre AS familia,
            concentracion.nombre AS concentracion,
            formafarmaceutica.nombre AS formafarmaceutica,
            presentacion.nombre AS presentacion,
            medicamento.estado
         FROM
            medicamento m
         JOIN nombre ON m.id_nombre = nombre.id
         JOIN categoria ON m.id_categoria = categoria.id
         JOIN familia ON m.id_familia = familia.id
         JOIN concentracion ON m.id_concentracion = concentracion.id
         JOIN formafarmaceutica ON m.id_formafarmaceutica = formafarmaceutica.id
         JOIN presentacion ON m.id_presentacion = presentacion.id
         WHERE
            medicamento.estado = 1
      `);
      return medicamentos;
   }

   static async obtenerMedicamentoPorId(id) {
      const [rows] = await connection.execute('SELECT * FROM medicamento WHERE id = ?', [id]);
      return rows[0];
   }

   static async habilitarMedicamento(id) {
      const [result] = await connection.execute('UPDATE medicamento SET estado = 1 WHERE id = ?', [id]);
      return result.affectedRows;
   }

   static async deshabilitarMedicamento(id) {
      const [result] = await connection.execute('UPDATE medicamento SET estado = 0 WHERE id = ?', [id]);
      return result.affectedRows;
   }  

}