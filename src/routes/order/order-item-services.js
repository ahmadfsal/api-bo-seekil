const OrderItemServices = require('../../controllers/order/order-item-services');
const router = require('express').Router();

router
    .post('/item/services', OrderItemServices.create)
    .get('/item/services', OrderItemServices.findAll)
    .get('/item/:item_id/services', OrderItemServices.findByItemId)
    .get('/item/services/:service_id', OrderItemServices.findByServiceId)
    .put('/item/services/:id', OrderItemServices.update)
    .delete('/item/services/:id', OrderItemServices.delete)
    .delete('/item/delete-all/services', OrderItemServices.deleteAll);

module.exports = router;
