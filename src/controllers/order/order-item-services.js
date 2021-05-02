const db = require('../../models/db');
const OrderItemServices = db.order_item_services;
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
        item_id: req.body.item_id,
        service_id: req.body.service_id
    };

    OrderItemServices.create(body)
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};

exports.findAll = (req, res) => {
    OrderItemServices.findAll()
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

exports.findByItemId = (req, res) => {
    const { item_id } = req.params;

    OrderItemServices.belongsTo(MasterServices, { foreignKey: 'service_id' });

    OrderItemServices.findAll({
        where: { item_id: item_id },
        include: [
            {
                model: MasterServices,
                required: false
            }
        ]
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

exports.findByServiceId = (req, res) => {
    const { service_id } = req.params;

    OrderItemServices.findOne({ where: { service_id: service_id } })
        .then((data) => {
            res.send({
                data: data,
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

    OrderItemServices.update(req.body, {
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

    OrderItemServices.destroy({
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
    OrderItemServices.destroy({
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
