import express from 'express';
import { ObraSocialController } from '../controllers/obrasocial.js';

export const obrasocialesRouter = express.Router();

// obrasocialesRouter.get('/', ObraSocialController.vista)
obrasocialesRouter.get('/planes/:idObraSocial', ObraSocialController.obtenerPlanesPorObraSocial) // 🟢