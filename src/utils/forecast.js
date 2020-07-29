const request = require('request')

//getting back the forecast data from weatherstack.com
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=d1f23074729517fa2fcf75cf4ab19b3d&query='+ latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, response) => {
        const {error: bodyError, weather_descriptions, temperature, feelslike} = response.body.current
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (bodyError){
            callback('Unable to find location. Please try another search', undefined)
        } else {
            callback(undefined,`${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })
}

  module.exports = forecast