const orderItem = require('../../controllers/order/order-item');
const router = require('express').Router();

router
    .post('/item', orderItem.create)
    .get('/item', orderItem.findAll)
    .get('/item/:order_id', orderItem.findByOrderId)
    .put('/item/:id', orderItem.update)
    .delete('/item/:id', orderItem.delete)
    .delete('/delete-all/item', orderItem.deleteAll);

module.exports = router;
