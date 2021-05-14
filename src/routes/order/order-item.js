const authenticateToken = require('../../middleware/authenticate-token')

module.exports = (app) => {
    const orderItem = require('../../controllers/order/order-item')

    let router = require('express').Router()

    router.post('/item', orderItem.create)
    router.get('/item', orderItem.findAll)
    router.get('/item/:order_id', orderItem.findByOrderId)
    router.put('/item/:id', orderItem.update)
    router.delete('/item/:id', orderItem.delete)
    router.delete('/item', orderItem.deleteAll)

    app.use('/order', authenticateToken, router)
}
