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
exports.getAlbums = exports.getSpotifyToken = void 0;
var utils_1 = require("./utils");
// Set necessary parts of the credentials on the constructor
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '6e23d575ceee45f2b6aeefb606ab3a42',
    clientSecret: '97af3dc00ecc4dda90671e4d9ffba270'
});
// Get an access token and 'save' it using a setter
var getSpotifyToken = function () {
    spotifyApi.clientCredentialsGrant().then(function (data) {
        console.log('El token de acceso es: ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Ha ocurrido un error!', err);
    });
};
exports.getSpotifyToken = getSpotifyToken;
var getAlbums = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var respuesta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombreArtista)
                    throw new utils_1.Exception("Por favor ingrese nombre de artista en el body", 400);
                respuesta = "";
                return [4 /*yield*/, spotifyApi.searchArtists(req.body.nombreArtista)
                        .then(function (data) {
                        return __awaiter(this, void 0, void 0, function () {
                            var artistaId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        artistaId = data.body.artists.items[0].id;
                                        return [4 /*yield*/, spotifyApi.getArtistAlbums(artistaId)
                                                .then(function (data) {
                                                respuesta = data;
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
                return [2 /*return*/, res.json({ message: respuesta })];
        }
    });
}); };
exports.getAlbums = getAlbums;
