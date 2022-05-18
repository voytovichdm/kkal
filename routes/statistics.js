const express = require('express')
const model = require('../models')
const { Op } = require('sequelize');
const router = express.Router()
// .gitignore fix
router.post('/statistics',
    async (req, res) => {
    try {
        const startedDate = new Date(req.body.dateStart);
        const endDate = new Date(req.body.dateFinish);

        let resultDBTest = []

        if(req.body.meal) {
            let resultDB = await model.Users.findAll({
                where: {
                    name: req.body.name
                },
                attributes: ['id', 'name', 'email'],
                include: {
                    model: model.Meals,
                    where : [{ meal: req.body.meal },
                        {"createdAt" : {[Op.between] : [startedDate , endDate]}}],
                    // attributes: [
                    //         [sequelize.fn("SUM", sequelize.col("protein_a")), 'res_protein_a'],
                    //         [sequelize.fn("SUM", sequelize.col("protein_v")), 'res_protein_a']
                    //     ]
                }
            })
            resultDBTest = resultDB
        } else {
            let resultDB = await model.Users.findAll({
                where: {
                    name: req.body.name
                },
                attributes: ['id', 'name', 'email'],
                include: {
                    attributes: {
                      exclude: ["id", 'meal', 'name', 'createdAt']
                    },
                    model: model.Meals,
                    raw: true,
                    where : [
                        {"createdAt" : {[Op.between] : [startedDate , endDate]}}]
                }
            })
            resultDBTest = resultDB
        }

        let objMeals = resultDBTest[0]

        if(objMeals) {
            let result = {
                protein_a: 0,
                protein_v: 0,
                fats_a: 0,
                fats_v: 0,
                carbohydrates_f: 0,
                carbohydrates_s: 0,
                calories: 0,
            };

            objMeals.Meals.forEach(meal=>{
                result.protein_a += meal['protein_a'];
                result.protein_v += meal['protein_v'];
                result.fats_a += meal['fats_a'];
                result.fats_v += meal['fats_v'];
                result.carbohydrates_f += meal['carbohydrates_f'];
                result.carbohydrates_s += meal['carbohydrates_s'];
                result.calories += meal['calories'];
            })

            res.status(200).json(result)
        } else {
            res.status(404).json({ message: 'Not found'})
        }
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router