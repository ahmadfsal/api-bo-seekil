const orderItem = require('../../controllers/order/order-item');
const router = require('express').Router();

router
    .post('/item', orderItem.create)
    .get('/item/all', orderItem.findAll)
    .get('/item/current-month', orderItem.findCurrentMonth)
    .get('/item/:order_id', orderItem.findByOrderId)
    .put('/item/:id', orderItem.update)
    .delete('/item/:order_id', orderItem.delete)
    .delete('/delete-all/item', orderItem.deleteAll);

module.exports = router;
