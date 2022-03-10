const customer = require('../../controllers/customer');
const router = require('express').Router();

router
    .post('/', customer.create)
    .post('/login', customer.login)
    .get('/', customer.findAll)
    .get('/:customer_id', customer.findOne)
    .put('/:customer_id', customer.update)
    .delete('/:customer_id', customer.delete)
    .delete('/', customer.deleteAll);

module.exports = router;
