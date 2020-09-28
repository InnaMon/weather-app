const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaW5uYW0iLCJhIjoiY2tmZzVqeHd3MDZtZzJ5bzRjbnczd3pwZSJ9.DPIgN14rYSCPs9XDS20_5g`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (!response.body.features.length) {
            callback(`Unable to find location. Try another search.`, undefined)
        } else {
            const longitude = response.body.features[0].center[0];
            const latitude = response.body.features[0].center[1];
            const location = response.body.features[0].place_name;
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            });
        }
    })
}

module.exports = geocode;