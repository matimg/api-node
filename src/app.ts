
import { createConnection } from 'typeorm';
import publicRoutes from './public_routes'
import express = require('express');
import cors = require('cors');
import morgan = require('morgan');

const PORT:string = process.env.PORT || '3000';
const app = express();

// create a database connection based on the ./ormconfig.js file
const connectionPromess = createConnection();

app.use(cors()) //disable CORS validations
app.use(express.json()) // the API will be JSON based for serialization
app.use(morgan('dev')); //logging
app.use(publicRoutes);

// default empty route for 404
app.use( (req, res) => res.status(404).json({ "message": "Not found" }))

// start the express server, listen to requests on PORT
app.listen(PORT , () => 
	console.info(
`==> Listening on port ${PORT}.`
	)
);