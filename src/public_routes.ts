import { Router } from 'express';
 import { safe } from './utils';
 import * as actions from './actions';
 
 const router = Router();
 
 // signup route, creates a new user in the DB
 // router.post('/user', safe(createUser));
 
 // LOGIN 
 router.post('/getAlbums', safe(actions.getAlbums));

 export default router;