const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ebf818ddf4a346dc9ff7f585a7fedeee&query=${latitude},${longitude}&units=f&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback(response.body.error.info, undefined)
        } else {
            const data = response.body.current;
            const img = data.weather_icons;
            callback(undefined, {
                description: `${data.weather_descriptions}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`,
                img
            });
        }
    })
}

module.exports = forecast;