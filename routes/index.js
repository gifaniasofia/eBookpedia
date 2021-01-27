const Controller = require('../controllers/controller.js');
const router = require('express').Router();
const routeBook = require('./routeBook.js');
const routeMember = require('./routeMember.js');
const routeRental = require('./routeRental.js');

router.get('/', Controller.getHome);
router.get('/login', Controller.getLogin);
router.get('/logout', Controller.getLogout);

router.use('/books', routeBook);
router.use('/members', routeMember);
router.use('/rentals', routeRental);

module.exports = router;