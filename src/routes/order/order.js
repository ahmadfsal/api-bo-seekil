const order = require('../../controllers/order/order');
const router = require('express').Router();

router
    .post('/', order.create)
    .get('/', order.findAll)
    .get('/:order_id', order.findByOrderId)
    .put('/:order_id', order.update)
    .delete('/:id', order.delete)
    .delete('/', order.deleteAll);

module.exports = router;
