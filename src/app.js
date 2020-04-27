const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Phil Merrilees'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Phil Merrilees'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Phil Merrilees',
        message: 'Welcome to the help page'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({error});          
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({error});
          }
      
          res.send({
            address: req.query.address,
            forecast: forecastData,
            location: location
          });
        });  
    });
});

// Match anything /help/*
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404 - Help',
        message: 'Help article not found',
        name: 'Phil Merrilees',
    });
});

// Match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 - Help',        
        message: 'Page not found',
        name: 'Phil Merrilees'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
