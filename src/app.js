const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlesbar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        content: 'Type in location below to see current weather details!',
        name: 'Inna Monjoseph'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content: 'This easy to use weather app gauges third-party HTTP APIs to pull in real-time weather data for a given location. Mapbox’s forward geocoding query looks up a single location by name, returning its geographic coordinates. From there, the coordinates query the Weather Stack API to retrieve the real-time weather details. We use tools like express.js to set up our server, the Request package for easy to write HTTP calls, and the HandleBars templating language to render content dynamically. All you have to do is submit a location of your choice (can be city name or zip code) in the weather input. Enjoy!',
        name: 'Inna Monjoseph'
    });
})

app.get('/resources', (req, res) => {
    res.render('resources', {
        title: 'Resources',
        content: 'Links to third-party API and package documentation:',
        weatherAPI: {
            name: 'Weather App API',
            link: 'https://weatherstack.com/documentation'
        },
        mapbox: {
            name: 'Mapbox Geocoding API',
            link: 'https://docs.mapbox.com/api/search/#forward-geocoding'
        },
        request: {
            name: 'Request',
            link: 'https://www.npmjs.com/package/request'
        },
        handlebars: {
            name: 'Handlebars.js',
            link: 'https://www.npmjs.com/package/hbs'
        },
        express: {
            name: 'Express.js',
            link: 'https://expressjs.com'
        },
        name: 'Inna Monjoseph',
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } 
                res.send({
                    forecast: forecastData.description,
                    location,
                    address: req.query.address,
                    img: forecastData.img
                })
            })
        }
    })
})

app.get('/help/*' , (req, res) => {
    res.render('error', {
        title: 'Help Error Page',
        content: 'Help article not found',
        name: 'Inna Monjoseph'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        content: 'Page not found',
        name: 'Inna Monjoseph'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});