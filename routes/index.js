const Controller = require('../controllers/controller.js');
const router = require('express').Router();

router.get('/', Controller.getHome);

module.exports = router;