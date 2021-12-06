const { Sequileze } = require('../../models/db');
const db = require('../../models/db');
const moment = require('moment');
const StoreSpendingMoney = db.store_spending_money;
const callback = require('../../presenter/callback');
const Op = Sequileze.Op;

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
            description: req.body.description,
            price: req.body.price
        };

        StoreSpendingMoney.create(body)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findAll: (req, res) => {
        StoreSpendingMoney.findAndCountAll({
            order: [['name', 'ASC']]
        })
            .then((data) => {
                const total = data.rows.reduce(
                    (acc, curr) => acc + curr['price'],
                    0
                );
                return res.status(200).send({
                    total,
                    list: data.rows,
                    pagination: {
                        current_page: parseInt(req.query.page),
                        limit: parseInt(req.query.limit),
                        total_page:
                            (parseInt(req.query.page) - 1) *
                            parseInt(req.query.limit),
                        total_row: data.count
                    },
                    meta: {
                        code: 200,
                        status: 'OK'
                    }
                });
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    findOne: (req, res) => {
        const { id } = req.params;

        StoreSpendingMoney.findOne({ where: { id: id } })
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findCurrentMonth: async (req, res) => {
        const firstDay = `${moment()
            .startOf('month')
            .format('YYYY-DD-MM')} 00:00:00`;
        const lastDay = `${moment()
            .endOf('month')
            .format('YYYY-DD-MM')} 23:59:59`;

        StoreSpendingMoney.findAll({
            where: {
                createdAt: {
                    [Op.gte]: firstDay,
                    [Op.lte]: lastDay
                }
            }
        })
            .then((data) => {
                const total = data.reduce(
                    (acc, curr) => acc + curr['price'],
                    0
                );
                return res.status(200).send({
                    total,
                    list: data,
                    pagination: {
                        current_page: parseInt(req.query.page),
                        limit: parseInt(req.query.limit),
                        total_page:
                            (parseInt(req.query.page) - 1) *
                            parseInt(req.query.limit),
                        total_row: data.length
                    },
                    meta: {
                        code: 200,
                        status: 'OK'
                    }
                });
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    update: (req, res) => {
        const id = req.params.id;

        StoreSpendingMoney.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    StoreSpendingMoney.findOne({ where: { id: id } }).then(
                        (data) => {
                            callback.single(200, res, data);
                        }
                    );
                } else {
                    callback.update(200, res, 'failed', id);
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    delete: (req, res) => {
        const id = req.params.id;

        StoreSpendingMoney.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    deleteAll: (req, res) => {
        StoreSpendingMoney.destroy({
            where: {},
            truncate: false
        })
            .then((nums) =>
                res.send({ message: `${nums} were deleted successfully!` })
            )
            .catch((err) => callback.error(500, res, err.message));
    }
};
