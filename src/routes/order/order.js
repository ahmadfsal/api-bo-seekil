module.exports = (app) => {
    const order = require('../../controllers/order/order')

    let router = require('express').Router()

    router.post('/', order.create)
    router.get('/', order.findAll)
    router.get('/:order_id', order.findByOrderId)
    router.put('/:order_id', order.update)
    router.delete('/:id', order.delete)
    router.delete('/', order.deleteAll)

    app.use('/order', router)
}
