const ControllerRental = require('../controllers/controllerRental.js');
const router = require('express').Router();

router.get('/', (req, res) => res.redirect('/rentals/1'));
router.get('/:page', ControllerRental.getList);
router.get('/:page', ControllerRental.postList);

router.get('/:page/add', ControllerRental.getAdd);
router.post('/:page/add', ControllerRental.postAdd);

router.get('/:rental_id/returned', ControllerRental.getReturned);

router.get('/:rental_id/detail', ControllerRental.getViewRentalDetails);

module.exports = router;