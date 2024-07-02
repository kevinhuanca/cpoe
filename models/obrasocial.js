import connection from "./db.js";

export class ObraSocialModel {

   static async obtenerObrasSociales() {
      const [obrasSociales] = await connection.execute('SELECT * FROM obrasocial');
      return obrasSociales;
   }

   static async obtenerPlanesPorObraSocial(idObraSocial) { // 🟢
      const [planes] = await connection.execute('SELECT * FROM plan WHERE id_obrasocial = ?', [idObraSocial]);
      return planes;
   }

}