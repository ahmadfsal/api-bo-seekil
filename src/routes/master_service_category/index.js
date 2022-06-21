const controller = require('../../controllers/master_service_category');
const router = require('express').Router();

router.get('/', controller.findAll);

module.exports = router;