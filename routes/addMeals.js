const express = require('express')
const model = require('../models')
// const {where} = require("sequelize/types");
const router = express.Router()

router.post('/add/meal',
    async (req, res) => {
        try {
            await model.Meals.create({
                name: req.body.name,
                protein_a: req.body.protein_a,
                protein_v: req.body.protein_v,
                fats_a: req.body.fats_a,
                fats_v: req.body.fats_v,
                carbohydrates_f: req.body.carbohydrates_f,
                carbohydrates_s: req.body.carbohydrates_s,
                calories: req.body.calories,
                meal: req.body.meal
            })

            let user = await model.Users.findOne({
                where: {
                    name: "Dmytro"
                }
            });
            let food = await model.Meals.findOne({
                where: {
                    name: req.body.name
                }
            })
            let result = await user.addMeals(food);


            res.status(200).json(food)
        } catch (err) {
            console.log(err.message)
        }
    })

module.exports = router