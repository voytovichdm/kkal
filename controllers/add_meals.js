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

        let textByLine = fs.readFileSync('files/upload/meal.csv').toString().split("\n");
        let columns = textByLine[0].split(",")
        let results = textByLine[1].split(",")

        const meals = {}
        for (let i = 0; i < columns.length; i++) {
            meals[columns[i]] = results[i]
        }

        const information = await model.Foods.findOne({
            where: {
                name: meals.NAME,
            },
        });

        if (information) {
            information.protein_a = information.protein_a / 100 * +meals.GRAMS,
                information.protein_v = information.protein_v / 100 * +meals.GRAMS,
                information.fats_a = information.fats_a / 100 * +meals.GRAMS,
                information.fats_v = information.fats_v / 100 * +meals.GRAMS,
                information.carbohydrates_f = information.carbohydrates_f / 100 * +meals.GRAMS,
                information.carbohydrates_s = information.carbohydrates_s / 100 * +meals.GRAMS,
                information.calories = information.calories / 100 * +meals.GRAMS
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
            meal: meals.MEAL,
        });

        const user = await model.Users.findByPk(meals.ID);
        const food = await model.Meals.findByPk(meal.id);
        await user.addMeals(food);

        res.status(200).json({
            message: 'Saved',
        });


        // let results = [];
        // fs.createReadStream('files/upload/meal.csv')
        //     .pipe(csv())
        //     .on('data', (data) => {
        //         for(let key in data) {
        //             results[key] = data[key]
        //         }
        //     })
        //     .on('end', () => {
        //         console.log(result);
        //     });

    } catch (err) {
        next(err)
    }
}
