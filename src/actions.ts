import { Registro } from './entities/Registro';
import { Album } from './Album';
import { Request, Response } from 'express'
import SpotifyWebApi = require('spotify-web-api-node');
import { getRepository, ObjectLiteral, getConnection } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Exception } from './utils'
require('dotenv').config();

//Se setean credenciales en constuctor de spotifywebapi
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

//Obtiene y guarda token de acceso a la api
export const getSpotifyToken = () => {
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
            console.log('Ha ocurrido un error!', err);
        }
    );
}

//Recibe el nombre de un artista y devuelve el id de la primera coincidencia
export const getArtistByName = async (artistName: string): Promise<string> => {
    var respuesta: string;
    await spotifyApi.searchArtists(artistName)
        .then(function (data) {
            respuesta = data.body.artists.items[0].id;
        }, function (err) {
            respuesta = err;
        });

    return respuesta;
}

//Recibe el id de un artista y devuelve el id de todos sus albumes
export const getAlbumsIdByArtist = async (artistId: string): Promise<string[]> => {
    var respuesta: string[];
    await spotifyApi.getArtistAlbums(artistId)
        .then(function (data) {
            let albums = data.body.items;
            let albumsId: string[] = [];
            for (let i = 0; i < albums.length; i++) {
                albumsId.push(albums[i]['id']);
            }
            respuesta = albumsId
        }, function (err) {
            respuesta = err;
        });
    return respuesta;
}

//Recibe un array de ids y retorna la lista de albumes detallados y ordenados por popularidad.
export const getAlbumsInfo = async (albumsId: Array<string>): Promise<Album[]> => {
    var respuesta: Album[];
    await spotifyApi.getAlbums(albumsId)
        .then(function (data) {
            let albums = data.body.albums;
            let albumList: Album[] = [];
            for (let i = 0; i < albums.length; i++) {
                let album: Album = {
                    id: albums[i]['id'],
                    nombre: albums[i]['name'],
                    popularidad: albums[i]['popularity'],
                    fecha: albums[i]['release_date'],
                    imagenes: albums[i]['images']
                }
                albumList.push(album);
            }
            albumList.sort(function (a, b) {
                return (b.popularidad - a.popularidad)
            });

            respuesta = albumList;

        }, function (err) {
            console.error(err);
        });

    return respuesta;
}

//Guarda registro en base de datos
export const insertRequest = async (nombreArtista:string): Promise<any> =>{
    let dateTime = new Date();
    const registroRepo = getRepository(Registro);
    const registro = new Registro();
    registro.userIP = "12213314";
    registro.date = dateTime;
    registro.artistName = nombreArtista;
    const nuevoRegistro = registroRepo.create(registro);  //Creo un registro
    const results = await registroRepo.save(nuevoRegistro); //Grabo el nuevo registro 
    return results;
}

//Recibe el nombre de un artista, lo busca, obtiene sus albumes y los devuelve de forma ordenada por popularidad.
export const getAlbums = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.nombreArtista)
        throw new Exception("Por favor ingrese nombre de artista en el body", 400);
    var respuesta: any;
    //Grabo registro en la base con ip, fecha y nombre de artista
    insertRequest(req.body.nombreArtista).then(function(data){
        console.log(data);
    });
    await getArtistByName(req.body.nombreArtista)
        .then(async function (artistId) {
            await getAlbumsIdByArtist(artistId).then(async function (albumsId) {
                await getAlbumsInfo(albumsId).then(async function (albumsInfo) {
                    respuesta = albumsInfo;
                },
                    function (err) {
                        respuesta = err;
                    })
            }, function (err) {
                respuesta = err;
            })

        }, function (err) {
            respuesta = err;
        });
        var respuesta: any;

    return res.json({ data: respuesta });
}