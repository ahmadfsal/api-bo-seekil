module.exports = (app) => {
    const orderType = require('../../controllers/master/master-type')

    let router = require('express').Router()

    router.post('/', orderType.create)
    router.get('/', orderType.findAll)
    router.get('/:id', orderType.findOne)
    router.put('/:id', orderType.update)
    router.delete('/:id', orderType.delete)
    router.delete('/', orderType.deleteAll)

    app.use('/master/type', router)
}
