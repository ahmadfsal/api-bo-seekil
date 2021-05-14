const db = require('../../models/db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const randomStringGenerator = require('../../utils/random-string-generator');
const createOrder = require('../../helper/create-order');

const Order = db.order;
const OrderItem = db.order_item;
const OrderItemServices = db.order_item_services;
const OrderTracker = db.order_tracker;
const MasterType = db.master_type;
const MasterStatus = db.master_status;
const MasterPromo = db.master_promo;
const MasterPartnership = db.master_partnership;
const Customer = db.customer;
// const StoreLocation = db.store;

const error_message = 'Error occurred';

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }
    const body = {
        order_id: `SO${moment
            .utc()
            .format('YYMMDD')}${randomStringGenerator()}`,
        customer_name: req.body.customer_name,
        whatsapp: req.body.whatsapp,
        order_type_id: req.body.order_type_id,
        store_id: req.body.store_id,
        pickup_address: req.body.pickup_address,
        partnership_id: req.body.partnership_id,
        promo_id: req.body.promo_id,
        pickup_delivery_price: req.body.pickup_delivery_price,
        potongan: req.body.potongan,
        order_date: Date.now(),
        order_status_id: req.body.order_status_id,
        qty: req.body.qty,
        total: req.body.total
    };

    Order.create(body)
        .then((data) => {
            createOrder(
                { Customer, OrderItem, OrderItemServices },
                req,
                res,
                data
            );
            OrderTracker.create({
                order_id: data.dataValues.order_id,
                order_status_id: data.dataValues.order_status_id
            })
                .then(() => {})
                .catch(() => {});
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.findAll = (req, res) => {
    const queryParam = () => {
        delete req.query['limit'];
        delete req.query['page'];

        return req.query;
    };

    Order.belongsTo(MasterType, { foreignKey: 'order_type_id' });
    Order.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });
    Order.belongsTo(MasterPartnership, { foreignKey: 'partnership_id' });

    Order.findAll({
        offset: req.query.page ? parseInt(req.query.page) : null,
        limit: req.query.limit ? parseInt(req.query.limit) : null,
        order: [['order_date', 'DESC']],
        where: queryParam(),
        include: [
            {
                model: MasterType,
                required: false
            },
            {
                model: MasterStatus,
                required: false
            },
            {
                model: MasterPartnership,
                required: false
            }
        ]
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

    Order.belongsTo(MasterType, { foreignKey: 'order_type_id' });
    Order.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });
    Order.belongsTo(MasterPartnership, { foreignKey: 'partnership_id' });
    Order.belongsTo(MasterPromo, { foreignKey: 'promo_id' });

    Order.findOne({
        where: {
            order_id: order_id
        },
        include: [
            {
                model: MasterType,
                required: false
            },
            {
                model: MasterStatus,
                required: false
            },
            {
                model: MasterPartnership,
                required: false
            },
            {
                model: MasterPromo,
                required: false
            }
        ]
    })
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
            res.status(500).send({
                message: `Error retrieving id=${id}`
            });
        });
};

exports.update = (req, res) => {
    const order_id = req.params.order_id;

    Promise.all([
        Order.findOne({ where: { order_id: order_id } })
            .then((res) => res)
            .catch((err) => console.log(err)),
        OrderItem.findOne({ where: { order_id: order_id } })
            .then((res) => res)
            .catch((err) => console.log(err))
    ])
        .then((result) => {
            const dataOrder = result[0];
            const dataOrderItem = result[1];

            if (dataOrderItem && dataOrderItem.dataValues) {
                if (dataOrder && dataOrder.dataValues) {
                    Order.update(req.body, {
                        where: { order_id: order_id }
                    })
                        .then((resultOrder) => {
                            if (resultOrder[0] === 1) {
                                OrderTracker.create({
                                    order_id: order_id,
                                    order_status_id: req.body.order_status_id
                                })
                                    .then((resultOrderTracker) => {
                                        if (resultOrderTracker.dataValues) {
                                            res.status(200).send({
                                                message: `Success update order : ${order_id}`
                                            });
                                        }
                                    })
                                    .catch((err) =>
                                        res
                                            .status(500)
                                            .send({ message: `error: ${err}` })
                                    );
                                // const bodyItems = req.body.items;
                                // const arr = bodyItems.map((item) => {
                                //     return {
                                //         id: item.id,
                                //         item_id: item.item_id
                                //             ? item.item_id
                                //             : uuidv4(),
                                //         order_id: order_id,
                                //         item_name: item.item_name,
                                //         subtotal: item.subtotal,
                                //         note: item.note
                                //     };
                                // });

                                // OrderItem.bulkCreate(arr, {
                                //     updateOnDuplicate: ['item_name', 'subtotal', 'note']
                                // }).then(resultOrderItem => {
                                //     if (resultOrderItem) {

                                //         const arrServices = bodyItems.reduce((acc, curr) => {
                                //             const appended = curr.services_id.map(item => {
                                //                 return {
                                //                     id: item.id,
                                //                     item_id: item.item_id,
                                //                     service_id: item.service_id
                                //                 }
                                //             })
                                //             return [...acc, ...appended]
                                //         }, [])

                                //         OrderItemServices.bulkCreate(arrServices, {
                                //             updateOnDuplicate: ['item_id', 'service_id']
                                //         }).then(resultOrderItemService => {
                                //             if (resultOrderItemService) {
                                //                 res.status(200).send({
                                //                     message: 'Yeayyyyy'
                                //                 })
                                //             }
                                //         })
                                //     }
                                // })
                            }
                        })
                        .catch((err) => {
                            console.log(`error while updating order: ${err}`);
                        });
                } else {
                    res.send(404).send({
                        message: `Order Item with order_id = ${order_id} is not found`
                    });
                }
            } else {
                res.send(404).send({
                    message: `Order Item with order_id = ${order_id} is not found`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `error: ${err}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
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
    Order.destroy({
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
