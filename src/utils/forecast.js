const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/03be220c124f7b9c0665bd333c3ccd78/${latitude},${longitude}?units=si`
  let errorMessage = ''
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      errorMessage = 'Unable to connect to weather service!'
      callback(errorMessage, undefined)
    } else if (body.error) {
      errorMessage = 'Something went wrong!'
      callback(errorMessage, undefined)
    } else {
      const { temperature, precipProbability } = body.currently
      const message = `It´s currenlty ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
      callback(undefined, message)
    }
  })
}

module.exports = forecast
