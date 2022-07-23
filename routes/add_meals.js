const express = require("express");
const controllerAddMeals = require('../controllers/add_meals')
const passport = require("passport");

const router = express.Router();

router.post('/add-meals', passport.authenticate('jwt', {session: false}),controllerAddMeals.createFood)
router.post('/add-meals-csv', passport.authenticate('jwt', {session: false}),controllerAddMeals.createFoodCsv)

module.exports = router

