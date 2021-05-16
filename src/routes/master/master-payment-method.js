const paymentMethod = require('../../controllers/master/master-payment-method');
const router = require('express').Router();

router
    .post('/', paymentMethod.create)
    .get('/', paymentMethod.findAll)
    .get('/:id', paymentMethod.findOne)
    .put('/:id', paymentMethod.update)
    .delete('/:id', paymentMethod.delete)
    .delete('/', paymentMethod.deleteAll);

module.exports = router;
