const products = require('../../controllers/master/master-products');
const router = require('express').Router();

router
    .post('/', products.create)
    .get('/', products.findAll)
    .get('/:id', products.findOne)
    .put('/:id', products.update)
    .delete('/:id', products.delete)
    .delete('/', products.deleteAll);

module.exports = router;
