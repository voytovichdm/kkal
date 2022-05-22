const express = require('express');
const model = require('../models');

const router = express.Router();

router.post('/user/create',
  async (req, res) => {
    try {
      await model.Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.status(200).json({
        message: 'Сохранено',
      });
    } catch (err) {
      console.log(err.message);
    }
  });

module.exports = router;
