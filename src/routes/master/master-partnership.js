const authenticateToken = require('../../middleware/authenticate-token');

module.exports = (app) => {
    const partnership = require('../../controllers/master/master-partnership')

    let router = require('express').Router()

    router.post('/', partnership.create)
    router.get('/', partnership.findAll)
    router.get('/:id', partnership.findOne)
    router.put('/:id', partnership.update)
    router.delete('/:id', partnership.delete)
    router.delete('/', partnership.deleteAll)

    app.use('/master/partnership', authenticateToken, router)
}
