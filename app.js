const express = require('express');
const bodyParsec = require('body-parser');
const passport = require('passport')
const createUserRouth = require('./routes/create_user')
const createFoodRouth = require('./routes/create_food')
const addMealsRouth = require('./routes/add_meals')
const getStatisticsRouth = require("./routes/get_statistics");

const app = express();

app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use(bodyParsec.urlencoded({ extended: true }));
app.use(bodyParsec.json());

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/', createUserRouth);
app.use('/', createFoodRouth);
app.use('/', addMealsRouth);
app.use('/', getStatisticsRouth);

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

module.exports = app;
