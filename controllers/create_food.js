const model = require('../models')

module.exports.createFood = async (req, res, next) => {
    try {
        const food = await model.Foods.create({
            name: req.body.name,
            protein_a: req.body.protein_a,
            protein_v: req.body.protein_v,
            fats_a: req.body.fats_a,
            fats_v: req.body.fats_v,
            carbohydrates_f: req.body.carbohydrates_f,
            carbohydrates_s: req.body.carbohydrates_s,
            calories: req.body.calories
        })
        res.status(200).json(food)
    } catch (err) {
        next(err);
    }
}
