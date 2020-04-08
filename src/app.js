const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Anil',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Display Picture',
    name: 'Anil',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'We need more personal protection kits in New York',
    title: 'help',
    name: 'Anil',
  });
});

app.get('/weather', (req, res) => {
  const geoLocation = req.query.address;
  if (!geoLocation) {
    return res.send({
      error: 'You must provide the address',
    });
  }
  geocode(geoLocation, (error, { longitude, latitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(longitude, latitude, (error, forecast) => {
      if (error) res.send({ error });
      res.send({
        forecast,
        location,
        address: geoLocation,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'help error',
    msg: 'Error 404, page not found',
    name: 'Anil',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'global error message',
    msg: 'Help page not found',
    name: 'Anil',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
