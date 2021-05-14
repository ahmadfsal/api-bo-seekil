const jwt = require('jsonwebtoken');
const callback = require('../presenter/callback');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1].toString();
    const tokenEnv = process.env.TOKEN_SECRET.toString();

    if (token === null) {
        return callback(401, res, {
            meta: {
                status: 401,
                message: 'Access forbidden'
            }
        });
    }

    jwt.verify(token, tokenEnv, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;

        next();
    });
};
