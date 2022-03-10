const db = require('../../models/db');
const Customer = db.customer;
const CustomerMember = db.customer_member;
const callback = require('../../presenter/callback');
const generateAccessToken = require('../../middleware/generate-access-token');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils/pagination');
const { v4 } = require('uuid');

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
            return;
        }

        const body = {
            customer_id: req.body.customer_id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        Customer.create(body)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    findAll: async (req, res) => {
        const { name, page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        try {
            delete req.query.name;
            delete req.query.page;
            delete req.query.size;

            Customer.belongsTo(CustomerMember, { foreignKey: 'customer_id' });

            const data = await Customer.findAndCountAll({
                order: [['name', 'ASC']],
                limit,
                offset,
                where: {
                    [Op.and]: [
                        req.query,
                        name ? { name: { [Op.substring]: name } } : {}
                    ]
                },
                include: [
                    {
                        model: CustomerMember,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });

            return res.status(200).send({
                list: data.rows,
                pagination: getPagingData(data, page, limit),
                meta: {
                    code: 200,
                    status: 'OK'
                }
            });
        } catch (err) {
            callback.error(500, res, err.message);
        }
    },

    findOne: (req, res) => {
        const { customer_id } = req.params;

        Customer.findOne({ where: { customer_id } })
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
        const customer_id = req.params.customer_id;

        Customer.update(req.body, { where: { customer_id } })
            .then((num) => {
                if (num == 1) {
                    Customer.findOne({ where: { customer_id } }).then(
                        (data) => {
                            callback.single(200, res, data);
                        }
                    );
                } else {
                    callback.update(200, res, 'failed', customer_id);
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    delete: (req, res) => {
        const customer_id = req.params.customer_id;

        Customer.destroy({ where: { customer_id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', customer_id);
                else callback.delete(200, res, 'failed', customer_id);
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
