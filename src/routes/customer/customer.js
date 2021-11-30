const customer = require('../../controllers/customer');
const router = require('express').Router();

router
    .post('/', customer.create)
    .get('/', customer.findAll)
    .get('/:id', customer.findOne)
    .get('/:username/:password')
    .put('/:id', customer.update)
    .delete('/:id', customer.delete)
    .delete('/', customer.deleteAll);

module.exports = router;
