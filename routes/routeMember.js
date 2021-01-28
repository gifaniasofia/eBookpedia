const ControllerMember = require('../controllers/controllerMember.js');
const router = require('express').Router();

router.get('/', (req, res) => res.redirect('/members/1'));
router.get('/:page', ControllerMember.getList);
router.post('/:page', ControllerMember.postList);

router.get('/:page/add', ControllerMember.getAdd);
router.post('/:page/add', ControllerMember.postAdd);

router.get('/edit/:id', ControllerMember.getEdit);
router.post('/edit/:id', ControllerMember.postEdit);

router.get('/delete/:id', ControllerMember.getDelete);

module.exports = router;