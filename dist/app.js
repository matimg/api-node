"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var public_routes_1 = require("./public_routes");
var actions = require("./actions");
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var PORT = process.env.PORT || '3001';
var app = express();
// Crea la conexion a la base de datos basado en el ormconfig.json
(0, typeorm_1.createConnection)();
actions.getSpotifyToken();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(public_routes_1.default);
// Mensaje por defecto cuando no encuentra la ruta especificada
app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
// start servidor express en puerto 3001
app.listen(PORT, function () {
    return console.info("==> Listening on port " + PORT + ".");
});
//Cada una hora se refresca token de acceso a la api de spotify
setInterval(function () {
    actions.getSpotifyToken();
}, 1000 * 60 * 60);
