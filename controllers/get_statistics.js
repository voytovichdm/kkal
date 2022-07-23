const model = require("../models");
const {Op} = require("sequelize");
const time = require("../util/util");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports.download = async (req, res, next) => {
    const {
        name
    } = req.body;

    const result = await model.Foods.findOne({
        where: {
            name: req.body.name,
        },
    })
    res.status(200).json(result)

}

async function searchStatistics(startedDate, endDate, whereMealConditioning, nameOfUser) {
    const user = await model.Users.findOne({
        where: {
            name: nameOfUser,
        },
        attributes: ['id', 'name', 'email'],
        include: {
            model: model.Meals,
            where: [
                whereMealConditioning,
                {
                    createdAt: {
                        [Op.between]: [startedDate, endDate],
                    },
                },
            ],
        },
    });

    if (!user) return { message: 'Not found' };

    const result = {
        protein_a: 0,
        protein_v: 0,
        fats_a: 0,
        fats_v: 0,
        carbohydrates_f: 0,
        carbohydrates_s: 0,
        calories: 0,
    };

    user.Meals.forEach((meal) => {
        result.protein_a += meal.protein_a;
        result.protein_v += meal.protein_v;
        result.fats_a += meal.fats_a;
        result.fats_v += meal.fats_v;
        result.carbohydrates_f += meal.carbohydrates_f;
        result.carbohydrates_s += meal.carbohydrates_s;
        result.calories += meal.calories;
    });

    return result;
}

module.exports.getStatistics = async (req, res, next) => {
    try {
        const {
            dateStart, dateFinish, meal, name,
        } = req.body;

        const startedDate = new Date(dateStart);
        const endDate = new Date(dateFinish);

        const whereMealConditioning = meal ? {meal} : {};

        const result = await searchStatistics(startedDate, endDate, whereMealConditioning, name);

        if (result.message) res.status(404).json(result);
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
}

module.exports.downloadStatistics = async (req, res, next) => {
    try {
        const {dateStart, dateFinish, meal, name, } = req.body;

        const startedDate = new Date(dateStart);
        const endDate = new Date(dateFinish);

        const whereMealConditioning = meal ? { meal } : {};

        const result = await searchStatistics(startedDate, endDate, whereMealConditioning, name);
        const resultArr = [result];

        const date = Date.now();
        const nameOfFileStatistics = `files/uploaded/statistics-${time.timeConverter(date).toString()}.csv`;

        const csvWriter = createCsvWriter({
            path: nameOfFileStatistics,
            header: [
                { id: 'protein_a', title: 'PROTEIN_A' },
                { id: 'protein_v', title: 'PROTEIN_V' },
                { id: 'fats_a', title: 'FATS_A' },
                { id: 'fats_v', title: 'FATS_V' },
                { id: 'carbohydrates_f', title: 'CARBOHYDRATES_F' },
                { id: 'carbohydrates_s', title: 'CARBOHYDRATES_S' },
                { id: 'calories', title: 'CALORIES' },
            ],
        });

        csvWriter.writeRecords(resultArr)
            .then(() => {
            });

        res.status(200).json({ message: nameOfFileStatistics });
    } catch (err) {
        next(err)
    }
}
