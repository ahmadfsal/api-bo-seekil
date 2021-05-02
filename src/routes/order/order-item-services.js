module.exports = (app) => {
    const OrderItemServices = require('../../controllers/order/order-item-services');

    let router = require('express').Router();

    router.post('/item/services', OrderItemServices.create);
    router.get('/item/services', OrderItemServices.findAll);
    router.get('/item/:item_id/services', OrderItemServices.findByItemId);
    router.get('/item/services/:service_id', OrderItemServices.findByServiceId);
    router.put('/item/services/:id', OrderItemServices.update);
    router.delete('/item/services/:id', OrderItemServices.delete);
    router.delete('/item/services', OrderItemServices.deleteAll);

    app.use('/order', router);
};
