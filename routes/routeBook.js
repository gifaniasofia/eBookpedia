const ControllerBook = require('../controllers/controllerBook.js');
const router = require('express').Router();

router.get('/', (req, res) => res.redirect('/books/1'))
router.get('/:page', ControllerBook.getList);
router.post('/:page', ControllerBook.postList);

router.get('/:page/add', ControllerBook.getAdd);
router.post('/:page/add', ControllerBook.postAdd);

router.get('/edit/:id', ControllerBook.getEdit);
router.post('/edit/:id', ControllerBook.postEdit);

router.get('/delete/:id', ControllerBook.getDelete);

module.exports = router;