const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=3463080eccd6b98600992833eb6b2b8b`;

  request({ url, json: true }, (error, { body }) => {
    if (error) console.log('Unable to connect with location services');
    else if (body.cod === '400') {
      console.log('Unable to find location with given coordinates');
    } else {
      callback(
        undefined,
        `It is currently ${body.main.temp} degrees out. There is ${body.clouds.all}% chain of rain.
        The humidity is ${body.main.humidity} and the wind speed is ${body.wind.speed} m/hr`
      );
    }
  });
};

module.exports = forecast;
