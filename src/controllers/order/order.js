const db = require('../../models/db');
const createOrder = require('../../helper/create-order');
const callback = require('../../presenter/callback');
const { ORDER_STATUS_DONE } = require('../../constants/general.constant');
const { Op } = require('sequelize');
const fcmSendNotification = require('../../helper/fcm-notifications');

const Order = db.order;
const OrderItem = db.order_item;
const OrderItemServices = db.order_item_services;
const OrderTracker = db.order_tracker;
const MasterType = db.master_type;
const MasterStatus = db.master_status;
const MasterPromo = db.master_promo;
const MasterPartnership = db.master_partnership;
const MasterStore = db.master_store;
const MasterPaymentMethod = db.master_payment_method;
const Customer = db.customer;

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            callback.error(400, res, 'Content can not be empty!');
            return;
        }

        const customerBody = {
            id: req.body.customer_id,
            name: req.body.customer_name,
            whatsapp: req.body.whatsapp,
            gender: req.body.gender,
            birthday: req.body.birthday,
            address: req.body.pickup_address,
            points: req.body.points
        };

        const doCreate = (customerId) => {
            return createOrder(
                {
                    Order,
                    OrderTracker,
                    OrderItem,
                    OrderItemServices
                },
                req,
                res,
                customerId
            );
        };

        if (customerBody.id) {
            Customer.update(customerBody, { where: { id: customerBody.id } })
                .then(() => {
                    Customer.findOne({ where: { id: customerBody.id } }).then(
                        ({ id }) => doCreate(id)
                    );
                })
                .catch((err) => callback.error(500, res, err.message));
        } else {
            Customer.create(customerBody)
                .then(({ id }) => doCreate(id))
                .catch((err) => callback.error(500, res, err.message));
        }
    },

    findAll: async (req, res) => {
        const { customer_name, start_date, end_date } = req.query;
        try {
            Order.belongsTo(MasterType, { foreignKey: 'order_type_id' });
            Order.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });
            Order.belongsTo(MasterPartnership, {
                foreignKey: 'partnership_id'
            });
            Order.belongsTo(MasterStore, { foreignKey: 'store_id' });
            Order.belongsTo(MasterPromo, { foreignKey: 'promo_id' });
            Order.belongsTo(MasterPaymentMethod, {
                foreignKey: 'payment_method_id'
            });
            Order.belongsTo(Customer, { foreignKey: 'customer_id' });

            delete req.query.customer_name;
            delete req.query.start_date;
            delete req.query.end_date;

            const data = await Order.findAndCountAll({
                order: [['order_date', 'DESC']],
                where: {
                    [Op.and]: [
                        req.query,
                        {
                            [Op.and]: [
                                customer_name
                                    ? { '$customer.name$': customer_name }
                                    : {},
                                start_date && end_date
                                    ? {
                                          order_date: {
                                              [Op.gte]: `${start_date} 00:00:00`,
                                              [Op.lte]: `${end_date} 23:59:59`
                                          }
                                      }
                                    : {}
                            ]
                        }
                    ]
                },
                include: [
                    {
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        },
                        model: MasterPaymentMethod,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'description',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterType,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        },
                        model: MasterStore,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'description',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterStatus,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'whatsapp',
                                'address',
                                'latitude',
                                'longitude',
                                'potongan',
                                'drop_zone',
                                'start_date',
                                'end_date',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterPartnership,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                // 'name',
                                'discount',
                                // 'description',
                                'status',
                                'start_date',
                                'end_date',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterPromo,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'password',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: Customer,
                        required: false
                    }
                ]
            });

            const total_order = data.rows.reduce(
                (acc, curr) => acc + curr['total'],
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
        } catch (err) {
            return callback.error(500, res, err.message);
        }
    },

    findByOrderId: (req, res) => {
        const { order_id } = req.params;

        Order.belongsTo(MasterType, { foreignKey: 'order_type_id' });
        Order.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });
        Order.belongsTo(MasterPartnership, { foreignKey: 'partnership_id' });
        Order.belongsTo(MasterStore, { foreignKey: 'store_id' });
        Order.belongsTo(MasterPromo, { foreignKey: 'promo_id' });
        Order.belongsTo(MasterPaymentMethod, {
            foreignKey: 'payment_method_id'
        });
        Order.belongsTo(Customer, { foreignKey: 'customer_id' });

        Order.findOne({
            where: { order_id: order_id },
            include: [
                {
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    model: MasterPaymentMethod,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['id', 'description', 'createdAt', 'updatedAt']
                    },
                    model: MasterType,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    model: MasterStore,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['id', 'description', 'createdAt', 'updatedAt']
                    },
                    model: MasterStatus,
                    required: false
                },
                {
                    attributes: {
                        exclude: [
                            'id',
                            'whatsapp',
                            'address',
                            'latitude',
                            'longitude',
                            'potongan',
                            'drop_zone',
                            'start_date',
                            'end_date',
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: MasterPartnership,
                    required: false
                },
                {
                    attributes: {
                        exclude: [
                            'id',
                            // 'name',
                            'discount',
                            // 'description',
                            'status',
                            'start_date',
                            'end_date',
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: MasterPromo,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    model: Customer,
                    required: false
                }
            ]
        })
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    findAllByPeriod: async (req, res) => {
        const { start_date, end_date } = req.query;

        try {
            Order.belongsTo(MasterType, { foreignKey: 'order_type_id' });
            Order.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });
            Order.belongsTo(MasterPartnership, {
                foreignKey: 'partnership_id'
            });
            Order.belongsTo(MasterStore, { foreignKey: 'store_id' });
            Order.belongsTo(MasterPromo, { foreignKey: 'promo_id' });
            Order.belongsTo(MasterPaymentMethod, {
                foreignKey: 'payment_method_id'
            });
            Order.belongsTo(Customer, { foreignKey: 'customer_id' });

            // Remove null or undefined value in req.query
            // Also remove start_date and end_date
            // Cause start_date and end_date has defined in
            // First index of [Op.and]
            Object.keys(req.query).forEach((key) => {
                delete req.query.start_date;
                delete req.query.end_date;
                if (req.query[key] === undefined) {
                    delete req.query[key];
                }
            });

            const data = await Order.findAndCountAll({
                order: [['order_date', 'DESC']],
                where: {
                    [Op.and]: [
                        {
                            order_date: {
                                [Op.gte]: `${start_date} 00:00:00`,
                                [Op.lte]: `${end_date} 23:59:59`
                            }
                        },
                        req.query
                    ]
                },
                include: [
                    {
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        },
                        model: MasterPaymentMethod,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'description',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterType,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        },
                        model: MasterStore,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                // 'id',
                                'description',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterStatus,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'whatsapp',
                                'address',
                                'latitude',
                                'longitude',
                                'potongan',
                                'drop_zone',
                                'start_date',
                                'end_date',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterPartnership,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                // 'name',
                                'discount',
                                // 'description',
                                'status',
                                'start_date',
                                'end_date',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: MasterPromo,
                        required: false
                    },
                    {
                        attributes: {
                            exclude: [
                                'id',
                                'password',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        model: Customer,
                        required: false
                    }
                ]
            });
            const total_order = data.rows.reduce(
                (acc, curr) => acc + curr['total'],
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
        } catch (error) {
            return callback.error(500, res, error.message);
        }
    },

    findByCustomerId: (req, res) => {
        Order.belongsTo(MasterType, { foreignKey: 'order_type_id' });
        Order.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });
        Order.belongsTo(MasterPartnership, { foreignKey: 'partnership_id' });
        Order.belongsTo(MasterStore, { foreignKey: 'store_id' });
        Order.belongsTo(MasterPromo, { foreignKey: 'promo_id' });
        Order.belongsTo(MasterPaymentMethod, {
            foreignKey: 'payment_method_id'
        });
        Order.belongsTo(Customer, { foreignKey: 'customer_id' });

        const { customer_id } = req.params;

        const getQueryString = () => {
            if (Object.keys(req.query).length > 0) {
                delete req.query.limit;
                return {
                    customer_id: customer_id,
                    ...req.query
                };
            } else {
                return {
                    customer_id: customer_id
                };
            }
        };

        Order.findAndCountAll({
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
            where: getQueryString(),
            order: [['order_date', 'DESC']],
            include: [
                {
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    model: MasterPaymentMethod,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['id', 'description', 'createdAt', 'updatedAt']
                    },
                    model: MasterType,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    model: MasterStore,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['id', 'description', 'createdAt', 'updatedAt']
                    },
                    model: MasterStatus,
                    required: false
                },
                {
                    attributes: {
                        exclude: [
                            'id',
                            'whatsapp',
                            'address',
                            'latitude',
                            'longitude',
                            'potongan',
                            'drop_zone',
                            'start_date',
                            'end_date',
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: MasterPartnership,
                    required: false
                },
                {
                    attributes: {
                        exclude: [
                            'id',
                            // 'name',
                            'discount',
                            // 'description',
                            'status',
                            'start_date',
                            'end_date',
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: MasterPromo,
                    required: false
                },
                {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    model: Customer,
                    required: false
                }
            ]
        })
            .then((data) => {
                if (req.query) {
                    if (req.query.order_status_id !== ORDER_STATUS_DONE) {
                        const filter = data.rows.filter(
                            (el) => el.order_status_id !== ORDER_STATUS_DONE
                        );
                        return callback.list(200, req, res, {
                            ...data,
                            rows: filter
                        });
                    }
                    return callback.list(200, req, res, data);
                }
                return callback.list(200, req, res, data);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    findTopCustomers: (req, res) => {
        Order.belongsTo(Customer, { foreignKey: 'customer_id' });
        Order.findAll({
            limit: 3,
            raw: true,
            attributes: [
                [
                    db.sequelize.fn('count', db.sequelize.col('customer_id')),
                    'total_order'
                ]
            ],
            group: ['customer_id'],
            order: [[db.sequelize.literal('total_order'), 'DESC']],
            include: [
                {
                    attributes: {
                        exclude: [
                            'gender',
                            'birthday',
                            'address',
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: Customer,
                    required: false
                }
            ]
        })
            .then((data) => {
                res.status(200).send({
                    list: data,
                    meta: {
                        code: 200,
                        status: 'OK'
                    }
                });
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    update: (req, res) => {
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
                                        order_status_id:
                                            req.body.order_status_id
                                    })
                                        .then((resultOrderTracker) => {
                                            if (resultOrderTracker.dataValues) {
                                                callback.update(
                                                    200,
                                                    res,
                                                    'success',
                                                    order_id
                                                );
                                            }
                                        })
                                        .then(() => {
                                            fcmSendNotification(
                                                'Transaksi Selesai',
                                                `Transaksi atas nama ${resultOrder.customer_name} selesai. Rp${resultOrder.total} masuk ke laci, ya!`,
                                                order_id
                                            );
                                        })
                                        .catch((err) =>
                                            callback.error(
                                                500,
                                                res,
                                                err.message
                                            )
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
                                    //     },
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
                            .catch((err) =>
                                callback.update(200, res, 'failed', order_id)
                            );
                    } else {
                        res.send(404).send({
                            message: `Order Item with order_id = ${order_id} is not found`
                        });
                    }
                } else {
                    callback.error(
                        404,
                        `Order Item with order_id = ${order_id} is not found`
                    );
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    delete: (req, res) => {
        const order_id = req.params.order_id;

        Order.destroy({ where: { order_id: order_id } })
            .then(async (num) => {
                if (num > 0) {
                    // Get Order Item by order_id
                    await OrderItem.findAll({
                        where: { order_id: order_id }
                    }).then((items) => {
                        items.map(async (item) => {
                            await OrderItemServices.destroy({
                                where: { item_id: item.item_id }
                            });
                            await OrderItem.destroy({
                                where: { order_id: order_id }
                            });
                        });
                    });
                    await OrderTracker.destroy({
                        where: { order_id: order_id }
                    });

                    return callback.delete(200, res, 'success', order_id);
                } else {
                    callback.delete(200, res, 'failed', order_id);
                }
            })
            .then(() => {
                fcmSendNotification(
                    'Transaksi Dihapus',
                    `${order_id} udah dihapus. Yuk tingkatkan lagi usahamu!`,
                    order_id
                );
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    deleteAll: (req, res) => {
        Order.destroy({
            where: {},
            truncate: false
        })
            .then((nums) => {
                res.send({ message: `${nums} were deleted successfully!` });
            })
            .catch((err) => callback.error(500, res, err.message));
    }
};
