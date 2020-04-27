const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?' + 
                'access_key=2ac60c584748bdfd888876a8bab3004b' +
                '&query=' + longitude + ',' + latitude + 
                '&units=f';

    request(url, {json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (response.body.error) {
            callback('Unable to find location!');
        } else {            
            const {temperature, feelslike } = response.body.current;
            const msg = response.body.current.weather_descriptions[0] + '.  It is currently ' + temperature + ' out, it feels like ' + feelslike + '.';
            callback(undefined, msg);
        }
    });
};

module.exports = forecast;
