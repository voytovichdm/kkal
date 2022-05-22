const express = require('express');
const bodyParsec = require('body-parser');
const createRoutes = require('./routes/create');
const authRoutes = require('./routes/auth');
const mealRoutes = require('./routes/addMeals');
const statisticsRoutes = require('./routes/statistics');
const uploadRoutes = require('./routes/upload');

const app = express();

app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use(bodyParsec.urlencoded({ extended: true }));
app.use(bodyParsec.json());

app.use('/auth', authRoutes);
app.use('/', createRoutes);
app.use('/', mealRoutes);
app.use('/', statisticsRoutes);
app.use('/', uploadRoutes);

module.exports = app;
