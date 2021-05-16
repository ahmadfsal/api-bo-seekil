const orderTracker = require('../../controllers/order/order-tracker');
const router = require('express').Router();

router
    .get('/tracker', orderTracker.findAll)
    .get('/:order_id/tracker', orderTracker.findByOrderId)
    .put('/:order_id/tracker', orderTracker.update)
    .delete('/:order_id/tracker', orderTracker.delete)
    .delete('/tracker/all', orderTracker.deleteAll);

module.exports = router;