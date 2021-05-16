const db = require('../../models/db');
const { v4: uuidv4 } = require('uuid');
const OrderItem = db.order_item;
const callback = require('../../presenter/callback');

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
        OrderItem.findAll()
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    findByOrderId: (req, res) => {
        const { order_id } = req.params;

        OrderItem.findAll({ where: { order_id: order_id } })
            .then((data) => callback.list(200, req, res, data))
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
