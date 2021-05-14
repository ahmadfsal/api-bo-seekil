const authenticateToken = require('../../middleware/authenticate-token');

module.exports = (app) => {
    const products = require('../../controllers/master/master-products');

    let router = require('express').Router();

    router.post('/', products.create);
    router.get('/', products.findAll);
    router.get('/:id', products.findOne);
    router.put('/:id', products.update);
    router.delete('/:id', products.delete);
    router.delete('/', products.deleteAll);

    app.use('/master/product', authenticateToken, router);
};
