const fixedMonthlyExpenses = require('../../controllers/fixed_monthly_expenses');
const router = require('express').Router();

router
    .post('/', fixedMonthlyExpenses.create)
    .get('/', fixedMonthlyExpenses.findAll)
    .get('/all-income-and-expenditure', fixedMonthlyExpenses.countAllIncomeAndExpenditure)
    .get('/:id', fixedMonthlyExpenses.findOne)
    .put('/:id', fixedMonthlyExpenses.update)
    .delete('/:id', fixedMonthlyExpenses.delete)
    .delete('/', fixedMonthlyExpenses.deleteAll);

module.exports = router;
