module.exports = (app) => {
    const orderStatus = require('../../controllers/master/master-status')

    let router = require('express').Router()

    router.post('/', orderStatus.create)
    router.get('/', orderStatus.findAll)
    router.get('/:id', orderStatus.findOne)
    router.put('/:id', orderStatus.update)
    router.delete('/:id', orderStatus.delete)
    router.delete('/', orderStatus.deleteAll)

    app.use('/master/status', router)
}
