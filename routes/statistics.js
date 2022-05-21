const express = require('express');
const { Op } = require('sequelize');
const model = require('../models');

const router = express.Router();

router.post('/statistics',
  async (req, res) => {
    try {
      const { dateStart, dateFinish, meal } = req.body;

      const startedDate = new Date(dateStart);
      const endDate = new Date(dateFinish);

      const whereMealConditioning = meal ? { meal } : {};

      const user = await model.Users.findOne({
        where: {
          name: req.body.name,
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

      if (!user) res.status(404).json({ message: 'Not found' });

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

      res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
    }
  });

module.exports = router;
