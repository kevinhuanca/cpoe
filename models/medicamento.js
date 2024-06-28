import connection from './db.js';

export class MedicamentoModel { 

   static async obtenerMedicamentos() { // 🟢
      const [medicamentos] = await connection.execute(`
         SELECT
            m.id,
            nombre.nombregenerico AS nombre,
            categoria.nombre AS categoria,
            familia.nombre AS familia,
            concentracion.nombre AS concentracion,
            formafarmaceutica.nombre AS formafarmaceutica,
            presentacion.nombre AS presentacion,
            m.estado
         FROM
            medicamento m
         JOIN nombre ON m.id_nombre = nombre.id
         JOIN categoria ON m.id_categoria = categoria.id
         JOIN familia ON m.id_familia = familia.id
         JOIN concentracion ON m.id_concentracion = concentracion.id
         JOIN formafarmaceutica ON m.id_formafarmaceutica = formafarmaceutica.id
         JOIN presentacion ON m.id_presentacion = presentacion.id
         WHERE
            m.estado = 1
      `);
      return medicamentos;
   }

   static async agregarMedicamento(idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion, estado) { // 🟢
      const [result] = await connection.execute(`
         INSERT INTO medicamento(
            id_nombre,
            id_categoria,
            id_familia,
            id_concentracion,
            id_formafarmaceutica,
            id_presentacion,
            estado
         )
         VALUES(?, ?, ?, ?, ?, ?, ?)
      `, [idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion, estado]);
      return result.insertId;
   }

   static async obtenerNombres() { // 🟢
      const [nombres] = await connection.execute('SELECT * FROM nombre');
      return nombres;
   }

   static async obtenerCategorias() { // 🟢
      const [categorias] = await connection.execute('SELECT * FROM categoria');
      return categorias;
   }

   static async obtenerFamilias() { // 🟢
      const [familias] = await connection.execute('SELECT * FROM familia');
      return familias;
   }

   static async obtenerConcentraciones() { // 🟢
      const [concentraciones] = await connection.execute('SELECT * FROM concentracion');
      return concentraciones;
   }

   static async obtenerFormasFarmaceuticas() { // 🟢
      const [formasFarmaceuticas] = await connection.execute('SELECT * FROM formafarmaceutica');
      return formasFarmaceuticas;
   }

   static async obtenerPresentaciones() { // 🟢
      const [presentaciones] = await connection.execute('SELECT * FROM presentacion');
      return presentaciones;
   }      

   // static async obtenerMedicamentoPorId(id) {
   //    const [rows] = await connection.execute('SELECT * FROM medicamento WHERE id = ?', [id]);
   //    return rows[0];
   // }

   // static async habilitarMedicamento(id) {
   //    const [result] = await connection.execute('UPDATE medicamento SET estado = 1 WHERE id = ?', [id]);
   //    return result.affectedRows;
   // }

   // static async deshabilitarMedicamento(id) {
   //    const [result] = await connection.execute('UPDATE medicamento SET estado = 0 WHERE id = ?', [id]);
   //    return result.affectedRows;
   // }  

}