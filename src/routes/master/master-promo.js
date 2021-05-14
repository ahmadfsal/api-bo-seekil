const authenticateToken = require('../../middleware/authenticate-token')

module.exports = (app) => {
    const promo = require('../../controllers/master/master-promo')

    let router = require('express').Router()

    router.post('/', promo.create)
    router.get('/', promo.findAll)
    router.get('/:id', promo.findOne)
    router.put('/:id', promo.update)
    router.delete('/:id', promo.delete)
    router.delete('/', promo.deleteAll)

    app.use('/master/promo', authenticateToken, router)
}
