const services = require('../../controllers/master/master-services');
const router = require('express').Router();

router
    .post('/', services.create)
    .get('/', services.findAll)
    .get('/:id', services.findOne)
    .put('/:id', services.update)
    .delete('/:id', services.delete)
    .delete('/', services.deleteAll);

module.exports = router;
