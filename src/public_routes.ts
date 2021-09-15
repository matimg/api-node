import { Router } from 'express';
 import { safe } from './utils';
 import * as actions from './actions';
 
 const router = Router();
 
 //GET Albumes ordenados por popularidad
 router.post('/getAlbums', safe(actions.getAlbums));

 export default router;