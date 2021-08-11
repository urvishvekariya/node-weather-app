const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode=require('../src/geocode')
const weatherstack=require('../src/wStack')

//assign heroku port or default
const port=process.env.PORT || 3000

// define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// setup handlebars engine and view loaction and partials location 
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'urvish vekariya'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Urvish vekariya'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Urvish vekariya',
        helpmsg: 'Please Help Me.'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Urvish vekariya',
        errorMsg: 'Help article not found.'
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        address: 'surat'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address serach term'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            // return console.log(error)
            return res.send({error})
        }

        weatherstack(latitude, longitude, (error, forcastdata) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forcast: forcastdata,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forcast: forcastdata,
    //     location: location,
    //     address: req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Urvish vekariya',
        errorMsg: 'Page Not Found.'
    })
})
app.listen(port, () => {    
    console.log('server is up on port'+port+'.')
})