import { Request, Response } from 'express'
import { getRepository, ObjectLiteral, getConnection } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Exception } from './utils'

// Set necessary parts of the credentials on the constructor
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '6e23d575ceee45f2b6aeefb606ab3a42',
    clientSecret: '97af3dc00ecc4dda90671e4d9ffba270'
});

// Get an access token and 'save' it using a setter
export const getSpotifyToken = () => {
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log('El token de acceso es: ' + data.body['access_token']);
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
            console.log('Ha ocurrido un error!', err);
        }
    );
}



export const getAlbums = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.nombreArtista) 
        throw new Exception("Por favor ingrese nombre de artista en el body", 400);
    var respuesta = "";
    await spotifyApi.searchArtists(req.body.nombreArtista)
        .then(async function (data) {
            let artistaId = data.body.artists.items[0].id;
            await spotifyApi.getArtistAlbums(artistaId)
                .then(function (data) {
                    respuesta = data
                }, function (err) {
                    respuesta = err;
                });
        }, function (err) {
            respuesta = err;
        });

    return res.json({ message: respuesta });
}