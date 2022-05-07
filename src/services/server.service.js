const express = require('express')
const fetch = require('node-fetch')
var cors = require('cors')

const NodeCache = require('node-cache')
const { response } = require('express')

const cache = new NodeCache({stdTTL: 200})

const app = express()

app.use(cors())

app.get('/town-data', (req, res) => {

    const townUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${req.headers.town}&limit=1&appid=${req.headers.key}`
    const cacheKey = req.headers.town.toString()

    if (cache.has(cacheKey)) {
        return res.send(cache.get(cacheKey))
    } else {
        fetch(townUrl)
            .then((response) => response.json())
            .then((data) => {
                cache.set(cacheKey, {lat: data[0].lat, lon: data[0].lon})
                res.send({lat: data[0].lat, lon: data[0].lon})
            })
    }
})

app.get('/weather-data', (req, res) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.headers.lat}&lon=${req.headers.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${req.headers.key}`
    const cacheKey = `(${req.headers.lat.toString()}, ${req.headers.lon.toString()})`

    if (cache.has(cacheKey)) {
        return res.send(cache.get(cacheKey))
    } else {
        fetch(weatherUrl)
            .then((response) => response.json())
            .then((data) => {
                cache.set(cacheKey, data.daily)
                res.send(data.daily)
            })
    }
})


exports.start = () => {
    app.listen(8080, (err) => {
        if (err) {
            console.log(`Error : ${err}`);
            process.exit(-1);
        }
        console.log(`App is running on port : ${8080}`);
    });
}