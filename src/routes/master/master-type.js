const orderType = require('../../controllers/master/master-type');
const router = require('express').Router();

router
    .post('/', orderType.create)
    .get('/', orderType.findAll)
    .get('/:id', orderType.findOne)
    .put('/:id', orderType.update)
    .delete('/:id', orderType.delete)
    .delete('/', orderType.deleteAll);

module.exports = router;
