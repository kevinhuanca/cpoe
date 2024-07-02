import { ObraSocialModel } from "../models/obrasocial.js";

export class ObraSocialController {

   // static async vista(req, res) {}

   static async obtenerPlanesPorObraSocial(req, res) {
      const idObraSocial = req.params.idObraSocial;
      const planes = await ObraSocialModel.obtenerPlanesPorObraSocial(idObraSocial);
      res.json(planes);
   }

}