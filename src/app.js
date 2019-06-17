const path    = require('path');
const express = require('express');
const hbs     = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

const app     = express();

// Setup the public path
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// Handlebar setup
const viewsPath = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// For partial paths with handlebar
const partialPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialPath);

// Routes
app.get('', (req, res) => {
    res.render('index', {title: 'Weather', name: 'Suman kumar panda'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', name: 'Suman kumar panda'});
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You have to provide an address'});
    }   

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        // for empty object in destructuring we have given {}
        if (error) {
            return res.send({error: error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error});
            }
            res.send({forecast: forecastData, location: location, address: req.query.address});
        });
    });
});

// 404 Page
app.get('*', (req, res) => {
    res.render('404', { errorMessage: 'Page not found', title: '404', name: 'Suman kumar panda' });
});


app.listen(port, () => {
    console.log('Server is running at port'+ port);
});
