const db = require('../../models/db');
const Auth = db.auth;
const generateAccessToken = require('../../middleware/generate-access-token');
const callback = require('../../presenter/callback');

exports.token = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Username cannot be empty'
        });
        return;
    }

    Auth.findOne({ where: { username: req.body.username } })
        .then((result) => {
            if (result.dataValues) {
                const token = generateAccessToken({
                    username: result.username
                });
                callback(200, res, {
                    token: token
                });
            }
        })
        .catch((err) => console.log(err));
};
