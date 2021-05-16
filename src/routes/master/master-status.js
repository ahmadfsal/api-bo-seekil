const orderStatus = require('../../controllers/master/master-status');
const router = require('express').Router();

router
    .post('/', orderStatus.create)
    .get('/', orderStatus.findAll)
    .get('/:id', orderStatus.findOne)
    .put('/:id', orderStatus.update)
    .delete('/:id', orderStatus.delete)
    .delete('/', orderStatus.deleteAll);
    
module.exports = router;
