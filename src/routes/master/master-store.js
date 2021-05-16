const masterStore = require('../../controllers/master/master-store');
const router = require('express').Router();

router
    .post('/', masterStore.create)
    .get('/', masterStore.findAll)
    .get('/:id', masterStore.findOne)
    .put('/:id', masterStore.update)
    .delete('/:id', masterStore.delete)
    .delete('/', masterStore.deleteAll);

module.exports = router;
