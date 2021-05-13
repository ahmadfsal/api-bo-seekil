const db = require('../../models/db');

const OrderTracker = db.order_tracker;
const MasterStatus = db.master_status;

const error_message = 'Error occurred';

exports.findAll = (req, res) => {
    // OrderTracker.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });

    OrderTracker.findAll({
        // include: [
        //     {
        //         model: MasterStatus,
        //         required: false
        //     }
        // ]
    })
        .then((data) => {
            res.send({
                list: data,
                pagination: {
                    current_page: req.query.page
                        ? parseInt(req.query.page)
                        : null,
                    limit: req.query.limit ? parseInt(req.query.limit) : null,
                    total_row: data.length
                },
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

    OrderTracker.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });

    OrderTracker.findAll({
        where: {
            order_id: order_id
        },
        order: [['updatedAt', 'DESC']],
        include: [
            {
                attributes: { exclude: ['id', 'createdAt'] },
                model: MasterStatus,
                required: false
            }
        ]
    })
        .then((data) => {
            res.send({
                data: data,
                pagination: {
                    current_page: req.query.page
                        ? parseInt(req.query.page)
                        : null,
                    limit: req.query.limit ? parseInt(req.query.limit) : null,
                    total_row: data.length
                },
                meta: {
                    code: 200,
                    status: 'OK',
                    message: 'Success'
                }
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error ${err}`
            });
        });
};

exports.update = (req, res) => {
    const order_id = req.params.order_id;

    OrderTracker.findOne({ where: { order_id: order_id } })
        .then((result) => {
            if (result.status === 200) {
                OrderTracker.update({
                    where: {
                        order_id: order_id
                    }
                }).then((resultUpdate) => {
                    if (resultUpdate.status === 200) {
                        res.status(200).send({
                            message: `Success update order_id : ${order_id}`
                        });
                    }
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    OrderTracker.destroy({
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
    OrderTracker.destroy({
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
