module.exports = (app) => {
    const auth = require('../../controllers/auth');

    let router = require('express').Router();

    router.post('/token', auth.token);

    app.use('/auth', router);
};
