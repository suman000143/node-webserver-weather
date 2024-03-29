const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic3VtYW4wMDAxNDMiLCJhIjoiY2p3cWR6MDB0Mmw5ZDRhcDlveGlwcmI3dSJ9.FUSamgJzS7EyLaXHd7lZWw&limit=1';
    
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined); // Calling here the callback function which is a callback logic
        } else if (response.body.features.length === 0) {
            callback('Unable to find location and try another search', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name 
            });
        }
    });
}

module.exports = geocode;