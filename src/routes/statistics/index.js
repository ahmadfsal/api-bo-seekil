const router = require('express').Router();
const controller = require('../../controllers/statistics');

router.get('/month-in-year', controller.monthInYear);

module.exports = router;