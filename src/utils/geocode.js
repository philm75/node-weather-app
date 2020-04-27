const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                encodeURIComponent(address) + 
                '.json?access_token=pk.eyJ1IjoibWVycmlsZWVzcHAiLCJhIjoiY2s5ZWd0MG16MDFxMjNmcnpzcHdkYmFnZiJ9.gMJKGUOsXEZo0I2Hw2IsPA';

    request(url, {json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('No location found!');
        } else {
            const data = body;
            const longitude = data.features[0].center[1];
            const latitude = data.features[0].center[0];      
            callback(undefined, {
                longitude,
                latitude,
                location : data.features[0].place_name
            });
        }
    });                
}

module.exports = geocode;