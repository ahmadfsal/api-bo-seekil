const authenticateToken = require('../../middleware/authenticate-token')

module.exports = (app) => {
    const orderTracker = require('../../controllers/order/order-tracker')

    let router = require('express').Router()

    router.get('/tracker', orderTracker.findAll)
    router.get('/:order_id/tracker', orderTracker.findByOrderId)
    router.put('/:order_id/tracker', orderTracker.update)
    router.delete('/:order_/idtracker', orderTracker.delete)
    router.delete('/tracker', orderTracker.deleteAll)

    app.use('/order', authenticateToken, router)
}
