const db = require('../../models/db');
const Auth = db.auth;
const generateAccessToken = require('../../middleware/generate-access-token');

module.exports = {
    token: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Username cannot be empty'
            });
            return;
        }

        Auth.findOne({ where: { username: req.body.username } })
            .then((data) => {
                if (data) {
                    const token = generateAccessToken({
                        username: data.username
                    });
                    res.send({ token: token });
                }
            })
            .catch((err) => console.log(err));
    }
};
