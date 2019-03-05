const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather title',
    text: 'This is the home/weather page',
    name: 'Dorth'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'Missed "address" argument'
    })
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          forecastData,
          location,
          address
        })
      })
    })
  }

})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    text: 'This is the about page',
    name: 'Dorth'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    text: 'This is the help page',
    name: 'Dorth'
  })
})

app.get('/help/*', (req, res) => {
  res.render('not-found', {
    title: 'Page not found',
    text: 'Help article not found',
    name: 'Dorth'
  })
})

app.get('*', (req, res) => {
  res.render('not-found', {
    title: 'Page not found',
    text: 'Page not found',
    name: 'Dorth'
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})
