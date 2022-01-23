const db = require('../../models/db');
const Customer = db.customer;
const callback = require('../../presenter/callback');
const generateAccessToken = require('../../middleware/generate-access-token');
const { Op } = require('sequelize');

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
            return;
        }

        const body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        Customer.create(body)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findAll: (req, res) => {
        const { name } = req.query;
        Customer.findAndCountAll({
            order: [['name', 'ASC']],
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findOne: (req, res) => {
        const { id } = req.params;

        Customer.findOne({ where: { id: id } })
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    login: async (req, res) => {
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
    },
    update: (req, res) => {
        const id = req.params.id;

        Customer.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    Customer.findOne({ where: { id: id } }).then((data) => {
                        callback.single(200, res, data);
                    });
                } else {
                    callback.update(200, res, 'failed', id);
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    delete: (req, res) => {
        const id = req.params.id;

        Customer.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    deleteAll: (req, res) => {
        Customer.destroy({
            where: {},
            truncate: false
        })
            .then((nums) =>
                res.send({ message: `${nums} were deleted successfully!` })
            )
            .catch((err) => callback.error(500, res, err.message));
    }
};
