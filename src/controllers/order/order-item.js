const db = require('../../models/db');
const { v4: uuidv4 } = require('uuid');
const OrderItem = db.order_item;
const MasterServices = db.master_services;

const error_message = 'Error occurred';

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
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
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};

exports.findAll = (req, res) => {
    OrderItem.findAll()
        .then((data) => {
            res.send({
                list: data,
                meta: {
                    code: 200,
                    status: 'OK',
                    message: 'Success'
                }
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};

exports.findByOrderId = (req, res) => {
    const { order_id } = req.params;

    OrderItem.findAll({
        where: { order_id: order_id },
    })
        .then((data) => {
            res.send({
                list: data,
                meta: {
                    code: 200,
                    status: 'OK',
                    message: 'Success'
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: `Error retrieving id=${order_id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    OrderItem.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Updated successfully.' });
            } else {
                res.send({
                    message: `Cannot update id=${id}`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating id=' + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    OrderItem.destroy({
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'deleted successfully!' });
            } else {
                res.send({
                    message: `Cannot delete id=${id}`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete id=${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    OrderItem.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({ message: `${nums} were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};
