const storeSpendingMoney = require('../../controllers/spending_money');
const router = require('express').Router();

router
    .post('/', storeSpendingMoney.create)
    .get('/', storeSpendingMoney.findAll)
    .get('/:id', storeSpendingMoney.findOne)
    .put('/:id', storeSpendingMoney.update)
    .delete('/:id', storeSpendingMoney.delete)
    .delete('/', storeSpendingMoney.deleteAll);

module.exports = router;
