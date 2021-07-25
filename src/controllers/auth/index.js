const db = require('../../models/db');
const Auth = db.auth;
const Customer = db.customer;
const sequelize = db.sequelize;
const generateAccessToken = require('../../middleware/generate-access-token');
const callback = require('../../presenter/callback');

module.exports = {
    token: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Username cannot be empty'
            });
            return;
        }

        Auth.findOne({
            where: { username: req.body.username }
        })
            .then((data) => {
                if (data) {
                    const token = generateAccessToken({
                        username: data.username
                    });
                    res.send({ token: token });
                }
            })
            .catch((err) => console.log(err));
    },
    customerLogin: async (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Email or Passowrd cannot be empty'
            });
            return;
        }

        Customer.findOne({
            where: { email: req.body.email, password: req.body.password }
        })
            .then((data) => {
                if (data) {
                    const token = generateAccessToken({
                        data: data.dataValues
                    });
                    callback.single(200, res, {
                        ...data.dataValues,
                        token: token
                    });
                } else {
                    callback.single(
                        200,
                        res,
                        null,
                        'Akun tidak ditemukan, periksa kembali email dan password Anda'
                    );
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    }
};
