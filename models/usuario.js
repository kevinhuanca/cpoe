import connection from "./db.js";

export class UsuarioModel {
   static async obtenerUsuarioPorNombre(nombre) { // 🟢
      const [usuario] = await connection.execute('SELECT * FROM usuario WHERE nombre = ?', [nombre]);
      return usuario[0];
   }

   static async registrarUsuario(nombre, clave, rol) { // 🟢
      const [result] = await connection.execute('INSERT INTO usuario (nombre, clave, id_rol) VALUES (?, ?, ?)', [nombre, clave, rol]);
      return result.insertId;
   }

}