const router = require('express').Router();
const generateInvoiceController = require('../../controllers/order/generate-invoice');

router.get('/:order_id', generateInvoiceController.generate_invoice);

module.exports = router;
