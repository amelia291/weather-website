const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=d1f23074729517fa2fcf75cf4ab19b3d&query='+ latitude + ',' + longitude + '&units=m'
    
    // request({url, json: true}, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to weather services', undefined)
    //     } else if (response.body.error){
    //         callback('Unable to find location. Please try another search', undefined)
    //     } else {
    //         const forecast = response.body.current.weather_descriptions[0]
    //         const degree = response.body.current.temperature
    //         const feelsLike = response.body.current.feelslike
    //         callback(undefined,`${forecast}. It is currently ${degree} degrees out. It feels like ${feelsLike} degrees out.`)
    //     }
    // })

    request({url, json: true}, (error, response) => {
        const {error: bodyError, weather_descriptions, temperature, feelslike} = response.body.current
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (bodyError){
            callback('Unable to find location. Please try another search', undefined)
        } else {
            // const forecast = response.body.current.weather_descriptions[0]
            // const degree = response.body.current.temperature
            // const feelsLike = response.body.current.feelslike
            callback(undefined,`${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })
}

  module.exports = forecast