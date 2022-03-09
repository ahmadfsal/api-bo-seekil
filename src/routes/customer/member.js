const customerMember = require('../../controllers/customer/member');
const router = require('express').Router();

router
    .post('/', customerMember.create)
    .post('/login', customerMember.login)
    .get('/', customerMember.findAll)
    .get('/:member_id', customerMember.findOne)
    .put('/:member_id', customerMember.update)
    .delete('/:member_id', customerMember.delete)
    .delete('/', customerMember.deleteAll);

module.exports = router;
