const order = require('../../controllers/order/order');
const router = require('express').Router();

router
    .post('/', order.create)
    .get('/', order.findAll)
    .get('/period', order.findAllByPeriod)
    .get('/:order_id', order.findByOrderId)
    .get('/customer/:customer_id', order.findByCustomerId)
    .get('/customer/s/top', order.findTopCustomers)
    .put('/:order_id', order.update)
    .delete('/:order_id', order.delete)
    .delete('/', order.deleteAll);

module.exports = router;
