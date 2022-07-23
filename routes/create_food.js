const express = require("express");
const controllerCreateFood = require('../controllers/create_food')
const passport = require("passport");
const router = express.Router();

router.post('/create-food', passport.authenticate('jwt', {session: false}),controllerCreateFood.createFood)

module.exports = router
