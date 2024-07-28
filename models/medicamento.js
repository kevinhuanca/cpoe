import connection from './db.js';

export class MedicamentoModel { 

   static async agregarMedicamento(idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion) { // 🟢
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
         VALUES(?, ?, ?, ?, ?, ?, 1)
      `, [idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion]);
      return result.insertId;
   }

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
         ORDER BY nombre.nombregenerico
      `);
      return medicamentos;
   }

   static async obtenerMedicamentoPorId(id) { // 🟢
      const [medicamento] = await connection.execute(`
         SELECT
            nombre.nombregenerico AS nombre,
            concentracion.nombre AS concentracion,
            formafarmaceutica.nombre AS formafarmaceutica,
            presentacion.nombre AS presentacion
         FROM
            medicamento m
         JOIN nombre ON m.id_nombre = nombre.id
         JOIN concentracion ON m.id_concentracion = concentracion.id
         JOIN formafarmaceutica ON m.id_formafarmaceutica = formafarmaceutica.id
         JOIN presentacion ON m.id_presentacion = presentacion.id
         WHERE
            m.id = ?
      `, [id]);
      return medicamento[0];
   }

   static async obtenerMedicamento(id) { // 🟢
      const [medicamento] = await connection.execute(`
         SELECT
            id,
            id_nombre,
            id_categoria,
            id_familia,
            id_concentracion,
            id_formafarmaceutica,
            id_presentacion,
            estado
         FROM
            medicamento
         WHERE
            id = ?
      `, [id]);
      return medicamento[0];
   }

   static async obtenerNombres() { // 🟢
      const [nombres] = await connection.execute('SELECT * FROM nombre ORDER BY nombregenerico');
      return nombres;
   }

   static async obtenerCategorias() { // 🟢
      const [categorias] = await connection.execute('SELECT * FROM categoria ORDER BY nombre');
      return categorias;
   }

   static async obtenerFamilias() { // 🟢
      const [familias] = await connection.execute('SELECT * FROM familia ORDER BY nombre');
      return familias;
   }

   static async obtenerConcentraciones() { // 🟢
      const [concentraciones] = await connection.execute('SELECT * FROM concentracion ORDER BY nombre');
      return concentraciones;
   }

   static async obtenerFormasFarmaceuticas() { // 🟢
      const [formasFarmaceuticas] = await connection.execute('SELECT * FROM formafarmaceutica ORDER BY nombre');
      return formasFarmaceuticas;
   }

   static async obtenerPresentaciones() { // 🟢
      const [presentaciones] = await connection.execute('SELECT * FROM presentacion ORDER BY nombre');
      return presentaciones;
   }

   static async editarMedicamento(id, idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion) { // 🟢
      const [result] = await connection.execute(`
         UPDATE
            medicamento
         SET
            id_nombre = ?,
            id_categoria = ?,
            id_familia = ?,
            id_concentracion = ?,
            id_formafarmaceutica = ?,
            id_presentacion = ?
         WHERE
            id = ?
      `, [idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion, id]);
      return result.affectedRows;
   }

   static async habilitarMedicamento(id) { // 🟢
      const [result] = await connection.execute('UPDATE medicamento SET estado = 1 WHERE id = ?', [id]);
      return result.affectedRows;
   }

   static async deshabilitarMedicamento(id) { // 🟢
      const [result] = await connection.execute('UPDATE medicamento SET estado = 0 WHERE id = ?', [id]);
      return result.affectedRows;
   }  

   static async agregarNombre (nombregenerico) { // 🟢
      const [result] = await connection.execute('INSERT INTO nombre (nombregenerico) VALUES (?)', [nombregenerico]);
      return result.insertId;
   }

   static async agregarConcentracion (nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO concentracion (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }

   static async agregarFormaFarmaceutica (nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO formafarmaceutica (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }

   static async agregarPresentacion (nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO presentacion (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }
      
   static async agregarCategoria (nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO categoria (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }

   static async agregarFamilia (nombre) { // 🟢
      const [result] = await connection.execute('INSERT INTO familia (nombre) VALUES (?)', [nombre]);
      return result.insertId;
   }

}