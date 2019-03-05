const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZG9ydGgiLCJhIjoiY2pzdGFkdDBxMTYwNTQ5cnpsZGwxNTZlZSJ9.MsBf59FSsdnefj4aAv2g4A&limit=1`
  let errorMessage = ''
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      errorMessage = 'Unable to connect to geolocation services!'
      callback(errorMessage, undefined)
    } else if (body.features.length === 0) {
      errorMessage = 'Unable to find location. Try another search.'
      callback(errorMessage, undefined)
    } else {
      const data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode
