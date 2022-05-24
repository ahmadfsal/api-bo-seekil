const customerMember = require('../../controllers/member/member');
const memberPoints = require('../../controllers/member/points');
const router = require('express').Router();

router
    .post('/', customerMember.create)
    .post('/login', customerMember.login)
    .get('/', customerMember.findAll)
    .get('/:member_id', customerMember.findOne)
    .put('/:member_id', customerMember.update)
    .delete('/:member_id', customerMember.delete)
    .delete('/', customerMember.deleteAll)
    // points
    .get('/:member_id/points', memberPoints.findAll)
    .put('/:member_id/points', memberPoints.update)
    .post('/:member_id/points', memberPoints.create);

module.exports = router;
