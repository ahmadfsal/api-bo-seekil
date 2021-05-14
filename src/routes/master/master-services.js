const authenticateToken = require('../../middleware/authenticate-token')

module.exports = (app) => {
    const services = require('../../controllers/master/master-services')

    let router = require('express').Router()

    router.post('/', services.create)
    router.get('/', services.findAll)
    router.get('/:id', services.findOne)
    router.put('/:id', services.update)
    router.delete('/:id', services.delete)
    router.delete('/', services.deleteAll)

    app.use('/master/service', authenticateToken, router)
}
