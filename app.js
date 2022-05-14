const express = require('express')
const app = express()

app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use(bodyParsec.urlencoded({extended: true}))
app.use(bodyParsec.json())

module.exports = app