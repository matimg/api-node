import { createConnection } from 'typeorm';
import publicRoutes from './public_routes'
import * as actions from './actions';
import express = require('express');
import cors = require('cors');
import morgan = require('morgan');

const PORT:string = process.env.PORT || '3001';
const app = express();

// Crea la conexion a la base de datos basado en el ormconfig.json
createConnection();

actions.getSpotifyToken();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(publicRoutes);

// Mensaje por defecto cuando no encuentra la ruta especificada
app.use( (req, res) => res.status(404).json({ "message": "Not found" }))

// start servidor express en puerto 3001
app.listen(PORT , () => 
	console.info(
`==> Listening on port ${PORT}.`
	)
);

//Cada una hora se refresca token de acceso a la api de spotify
setInterval(() => {
	actions.getSpotifyToken();
}, 1000 * 60 * 60);