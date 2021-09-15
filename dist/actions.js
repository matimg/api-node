"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbums = exports.insertRequest = exports.getAlbumsInfo = exports.getAlbumsIdByArtist = exports.getArtistByName = exports.getSpotifyToken = void 0;
var Registro_1 = require("./entities/Registro");
var SpotifyWebApi = require("spotify-web-api-node");
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var utils_1 = require("./utils");
require('dotenv').config();
//Se setean credenciales en constuctor de spotifywebapi
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});
//Obtiene y guarda token de acceso a la api
var getSpotifyToken = function () {
    spotifyApi.clientCredentialsGrant().then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Ha ocurrido un error!', err);
    });
};
exports.getSpotifyToken = getSpotifyToken;
//Recibe el nombre de un artista y devuelve el id de la primera coincidencia
var getArtistByName = function (artistName) { return __awaiter(void 0, void 0, void 0, function () {
    var respuesta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, spotifyApi.searchArtists(artistName)
                    .then(function (data) {
                    respuesta = data.body.artists.items[0].id;
                }, function (err) {
                    respuesta = err;
                })];
            case 1:
                _a.sent();
                return [2 /*return*/, respuesta];
        }
    });
}); };
exports.getArtistByName = getArtistByName;
//Recibe el id de un artista y devuelve el id de todos sus albumes
var getAlbumsIdByArtist = function (artistId) { return __awaiter(void 0, void 0, void 0, function () {
    var respuesta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, spotifyApi.getArtistAlbums(artistId)
                    .then(function (data) {
                    var albums = data.body.items;
                    var albumsId = [];
                    for (var i = 0; i < albums.length; i++) {
                        albumsId.push(albums[i]['id']);
                    }
                    respuesta = albumsId;
                }, function (err) {
                    respuesta = err;
                })];
            case 1:
                _a.sent();
                return [2 /*return*/, respuesta];
        }
    });
}); };
exports.getAlbumsIdByArtist = getAlbumsIdByArtist;
//Recibe un array de ids y retorna la lista de albumes detallados y ordenados por popularidad.
var getAlbumsInfo = function (albumsId) { return __awaiter(void 0, void 0, void 0, function () {
    var respuesta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, spotifyApi.getAlbums(albumsId)
                    .then(function (data) {
                    var albums = data.body.albums;
                    var albumList = [];
                    for (var i = 0; i < albums.length; i++) {
                        var album = {
                            id: albums[i]['id'],
                            nombre: albums[i]['name'],
                            popularidad: albums[i]['popularity'],
                            fecha: albums[i]['release_date'],
                            imagenes: albums[i]['images']
                        };
                        albumList.push(album);
                    }
                    albumList.sort(function (a, b) {
                        return (b.popularidad - a.popularidad);
                    });
                    respuesta = albumList;
                }, function (err) {
                    console.error(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/, respuesta];
        }
    });
}); };
exports.getAlbumsInfo = getAlbumsInfo;
//Guarda registro en base de datos
var insertRequest = function (nombreArtista, ipCliente) { return __awaiter(void 0, void 0, void 0, function () {
    var dateTime, registroRepo, registro, nuevoRegistro, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dateTime = new Date();
                registroRepo = (0, typeorm_1.getRepository)(Registro_1.Registro);
                registro = new Registro_1.Registro();
                registro.userIP = ipCliente;
                registro.date = dateTime;
                registro.artistName = nombreArtista;
                nuevoRegistro = registroRepo.create(registro);
                return [4 /*yield*/, registroRepo.save(nuevoRegistro)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, results];
        }
    });
}); };
exports.insertRequest = insertRequest;
//Recibe el nombre de un artista, lo busca, obtiene sus albumes y los devuelve de forma ordenada por popularidad.
var getAlbums = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var respuesta, respuesta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombreArtista)
                    throw new utils_1.Exception("Por favor ingrese nombre de artista en el body", 400);
                //Grabo registro en la base con ip, fecha y nombre de artista
                (0, exports.insertRequest)(req.body.nombreArtista, req.ip).then(function (data) {
                    console.log(data);
                });
                return [4 /*yield*/, (0, exports.getArtistByName)(req.body.nombreArtista)
                        .then(function (artistId) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, exports.getAlbumsIdByArtist)(artistId).then(function (albumsId) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, (0, exports.getAlbumsInfo)(albumsId).then(function (albumsInfo) {
                                                                return __awaiter(this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        respuesta = albumsInfo;
                                                                        return [2 /*return*/];
                                                                    });
                                                                });
                                                            }, function (err) {
                                                                respuesta = err;
                                                            })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        }, function (err) {
                                            respuesta = err;
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }, function (err) {
                        respuesta = err;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ data: respuesta })];
        }
    });
}); };
exports.getAlbums = getAlbums;
