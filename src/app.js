const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config & setup static directory to serve
const viewsPath = path.join(__dirname, '../templates/views')
app.use(express.static(path.join(__dirname, '../public')))
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amelia'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Amelia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        contact: 'hoangmai.3715@gmail.com',
        name: 'Amelia'
    })
})
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
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

