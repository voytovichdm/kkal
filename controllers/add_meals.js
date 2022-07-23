const fs = require('fs');
const csv = require('csv-parser');
const model = require('../models');

module.exports.createFood = async (req, res, next) => {
    try {
        const information = await model.Foods.findOne({
            where: {
                name: req.body.name,
            },
        });

        if (information) {
            information.protein_a = information.protein_a / 100 * req.body.grams,
                information.protein_v = information.protein_v / 100 * req.body.grams,
                information.fats_a = information.fats_a / 100 * req.body.grams,
                information.fats_v = information.fats_v / 100 * req.body.grams,
                information.carbohydrates_f = information.carbohydrates_f / 100 * req.body.grams,
                information.carbohydrates_s = information.carbohydrates_s / 100 * req.body.grams,
                information.calories = information.calories / 100 * req.body.grams;
        }

        if (!information) res.status(404).json({ message: 'Not found' });

        const meal = await model.Meals.create({
            name: information.name,
            protein_a: information.protein_a,
            protein_v: information.protein_v,
            fats_a: information.fats_a,
            fats_v: information.fats_v,
            carbohydrates_f: information.carbohydrates_f,
            carbohydrates_s: information.carbohydrates_s,
            calories: information.calories,
            meal: req.body.meal,
        });

        const user = await model.Users.findByPk(req.body.id);
        const food = await model.Meals.findByPk(meal.id);
        await user.addMeals(food);

        res.status(200).json({
            message: 'Saved',
        });
    } catch (err) {
        next(err);
    }
}

module.exports.createFoodCsv = async (req, res, next) => {
    try {
        const results = [];
        fs.createReadStream('files/upload/meal.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
            });

        res.status(200).json({ message: 'Read' });
    } catch (err) {
        next(err)
    }
}
