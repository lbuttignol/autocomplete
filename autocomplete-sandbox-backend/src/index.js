const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const port = 3000;

// GOOGLE_PLACES_API_KEY=AIzaSyC0IjGyGcl7RA1ogt0wVfA4aKyeONdjW54

if (!process.env.GOOGLE_PLACES_API_KEY) throw new Error('Google Places API KEY is required');

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get('/v1/autocomplete', routes.findAddress);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))