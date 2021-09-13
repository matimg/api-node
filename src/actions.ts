import { Request, Response } from 'express'
import { getRepository, ObjectLiteral, getConnection } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Exception } from './utils'

// credentials are optional
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '6e23d575ceee45f2b6aeefb606ab3a42',
    clientSecret: '97af3dc00ecc4dda90671e4d9ffba270'
});
spotifyApi.setAccessToken('BQBEtzI4T79CXRBdFe4UXzUWRNTre0dvQwidJHkmEpGLzoTwSQwZwYJZjmfhlarm-L4mIxY_3FtoGcI4jPw');




// Retrieve an access token.
/*spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }*/

export const getAlbums = async (req: Request, res: Response): Promise<Response> => {

    /*if (!req.body.email) throw new Exception("Por favor ingrese email en el body", 400);
    if (!req.body.password) throw new Exception("Por favor ingrese password en el body", 400);

    const usuariosRepo = await getRepository(Usuarios);
    const USUARIO = await usuariosRepo.findOne({ where: { email: req.body.email } });
    if (!USUARIO) throw new Exception("El email o la contraseña es inválida", 401);
    if (!USUARIO.activo) throw new Exception("El usuario todavia no esta activo");

    let token = '';
    const validacionPassword = await bcrypt.compare(req.body.password, USUARIO.password)
    validacionPassword ? token = jwt.sign({ USUARIO }, process.env.JWT_KEY as string) : token = 'Invalid password'
    if (token === 'Invalid password') throw new Exception("Contraseña incorrecta");*/
   var respuesta = "";
    spotifyApi.search('La Vela Puerca', ['track', 'album'], { limit: 5, offset: 1 })
        .then(function (data: any) {
            console.log("DATA:",data.body.albums.items);
        }, function (err: any) {
            console.log("ERROR", err);
        });

    return res.json({ message: respuesta });


}