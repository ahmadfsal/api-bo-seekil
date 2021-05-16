const promo = require('../../controllers/master/master-promo');
const router = require('express').Router();

router
    .post('/', promo.create)
    .get('/', promo.findAll)
    .get('/:id', promo.findOne)
    .put('/:id', promo.update)
    .delete('/:id', promo.delete)
    .delete('/', promo.deleteAll);

module.exports = router;
