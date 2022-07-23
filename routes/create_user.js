const express = require('express');
const contrellerCreateUser = require('../controllers/create_user')

const router = express.Router();

router.post('/create-user', contrellerCreateUser.createUser)
router.post('/login', contrellerCreateUser.login)

module.exports = router;
