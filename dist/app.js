"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var public_routes_1 = require("./public_routes");
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var PORT = process.env.PORT || '3000';
var app = express();
// create a database connection based on the ./ormconfig.js file
var connectionPromess = (0, typeorm_1.createConnection)();
app.use(cors()); //disable CORS validations
app.use(express.json()); // the API will be JSON based for serialization
app.use(morgan('dev')); //logging
app.use(public_routes_1.default);
// default empty route for 404
app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
// start the express server, listen to requests on PORT
app.listen(PORT, function () {
    return console.info("==> Listening on port " + PORT + ".");
});
