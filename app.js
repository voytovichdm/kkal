const express = require('express')
const bodyParsec = require('body-parser')
const catogoryRoutes = require('./routes/create')
const app = express()

app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use(bodyParsec.urlencoded({extended: true}))
app.use(bodyParsec.json())

app.use('/', catogoryRoutes)

module.exports = app