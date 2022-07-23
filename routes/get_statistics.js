const express = require('express');
const controllerStatistics = require('../controllers/get_statistics')
const passport = require('passport')

const router = express.Router();

router.post('/statistics', passport.authenticate('jwt', {session: false}), controllerStatistics.getStatistics);
router.post('/download-statistics', passport.authenticate('jwt', {session: false}), controllerStatistics.downloadStatistics);
router.post('/download', passport.authenticate('jwt', {session: false}), controllerStatistics.download)

module.exports = router;
