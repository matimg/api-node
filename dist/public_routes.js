"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = require("./actions");
var router = (0, express_1.Router)();
//GET Albumes ordenados por popularidad
router.post('/getAlbums', (0, utils_1.safe)(actions.getAlbums));
exports.default = router;
