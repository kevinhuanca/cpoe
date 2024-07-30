import connection from "./db.js";

export class UsuarioModel {
   static async obtenerUsuarioPorNombre(nombre) { // 🟢
      const [usuario] = await connection.execute('SELECT * FROM usuario WHERE nombre = ?', [nombre]);
      return usuario[0];
   }

   static async obtenerUsuarioPorId(id) { // 🟢
      const [usuario] = await connection.execute('SELECT * FROM usuario WHERE id = ?', [id]);
      return usuario[0];
   }

   static async registrarUsuario(nombre, clave, rol) { // 🟢
      const [result] = await connection.execute('INSERT INTO usuario (nombre, clave, estado, id_rol) VALUES (?, ?, 1, ?)', [nombre, clave, rol]);
      return result.insertId;
   }

   static async actualizarUsuario(id, nombre, clave) { // 🟢
      const [result] = await connection.execute('UPDATE usuario SET nombre = ?, clave = ? WHERE id = ?', [nombre, clave, id]);
      return result.affectedRows;
   }

   static async habilitarUsuario(id) { // 🟢
      const [result] = await connection.execute('UPDATE usuario SET estado = 1 WHERE id = ?', [id]);
      return result.affectedRows;
   }

   static async deshabilitarUsuario(id) { // 🟢
      const [result] = await connection.execute('UPDATE usuario SET estado = 0 WHERE id = ?', [id]);
      return result.affectedRows;
   }

}