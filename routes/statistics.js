const express = require('express')
const model = require('../models')
const router = express.Router()

router.get('/day',
    async (req, res) => {
    try {
        let result = await model.Meals.findAll({
            where: {
                meal: '1',

            }
        })

        res.status(200).json(result)
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router