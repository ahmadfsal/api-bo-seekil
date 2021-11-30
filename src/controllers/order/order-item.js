const db = require('../../models/db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const OrderItem = db.order_item;
const Order = db.order;
const callback = require('../../presenter/callback');
const { Sequileze } = require('../../models/db');
const sequelize = db.sequelize;
const Op = Sequileze.Op;

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            callback.error(400, res, 'Content can not be empty!');
            return;
        }

        const body = {
            item_id: uuidv4(),
            order_id: req.body.order_id,
            item_name: req.body.item_name,
            subtotal: req.body.subtotal,
            note: req.body.note
        };

        OrderItem.create(body)
            .then((data) => {
                if (data) callback.create(200, res, 'success', data);
            })
            .catch((err) => callback.create(200, res, 'failed', data));
    },

    findAll: (req, res) => {
        OrderItem.findAndCountAll()
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    findCurrentMonth: async (req, res) => {
        const firstDay = `${moment()
            .startOf('month')
            .format('YYYY-DD-MM')} 00:00:00`;
        const lastDay = `${moment()
            .endOf('month')
            .format('YYYY-DD-MM')} 23:59:59`;

        Order.findAll({
            where: {
                order_date: {
                    [Op.gte]: firstDay,
                    [Op.lte]: lastDay
                }
            }
        })
            .then((data) => {
                console.log(data);
                const total_order = data.reduce(
                    (acc, curr) => acc + curr['total'],
                    0
                );
                return res.status(200).send({
                    total_order,
                    list: data,
                    meta: {
                        code: 200,
                        status: 'OK'
                    }
                });
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    findByOrderId: (req, res) => {
        const { order_id } = req.params;

        OrderItem.findAndCountAll({ where: { order_id: order_id } })
            .then((data) => {
                const total_order = data.rows.reduce(
                    (acc, curr) => acc + curr['subtotal'],
                    0
                );
                return res.status(200).send({
                    total_order,
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

    update: (req, res) => {
        const id = req.params.id;

        OrderItem.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) callback.update(200, res, 'success', id);
                else callback.update(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    delete: (req, res) => {
        const id = req.params.id;

        OrderItem.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    deleteAll: (req, res) => {
        OrderItem.destroy({
            where: {},
            truncate: false
        })
            .then((nums) => {
                res.send({ message: `${nums} were deleted successfully!` });
            })
            .catch((err) => callback.error(500, res, err.message));
    }
};
