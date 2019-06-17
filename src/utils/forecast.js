const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/82e089635d6b9eeb46d8befd2781e4d1/' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;
