const auth = require('../../controllers/auth');
const router = require('express').Router();

router.post('/token', auth.token).post('/login', auth.login);

module.exports = router;
