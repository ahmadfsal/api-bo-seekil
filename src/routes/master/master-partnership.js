const partnership = require('../../controllers/master/master-partnership');
const router = require('express').Router();

router
    .post('/', partnership.create)
    .get('/', partnership.findAll)
    .get('/:id', partnership.findOne)
    .put('/:id', partnership.update)
    .delete('/:id', partnership.delete)
    .delete('/', partnership.deleteAll);

module.exports = router;
