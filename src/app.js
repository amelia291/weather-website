const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config & setup static directory to serve
const viewsPath = path.join(__dirname, '../templates/views')
app.use(express.static(path.join(__dirname, '../public')))
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//main page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amelia'
    })
})

//about page
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Amelia'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        contact: 'hoangmai.3715@gmail.com',
        name: 'Amelia'
    })
})

//converting the location provided in the query string into coordinates and getting back weather information 
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//setting up 404 error page
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Help page',
        name: 'Amelia',
        message: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title:'',
        name: 'Amelia',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

