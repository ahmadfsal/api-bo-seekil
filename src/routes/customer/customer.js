const customer = require('../../controllers/customer');
const router = require('express').Router();

router
    .post('/', customer.create)
    .post('/login', customer.login)
    .get('/', customer.findAll)
    .get('/:id', customer.findOne)
    .put('/:id', customer.update)
    .delete('/:id', customer.delete)
    .delete('/', customer.deleteAll);

module.exports = router;
