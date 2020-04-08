const request = require('request');

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiYW5pbGtvcHBhcnRoeSIsImEiOiJjazhoc3QwZGswNGJiM25ycjV3Nm12a2F3In0.zQY4btJg0VeGv3T7S_ZN4Q&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) console.log('unable to connect to location services');
    else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
