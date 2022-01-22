const { v4: uuidv4 } = require('uuid');
const callback = require('../presenter/callback');
const moment = require('moment');
const randomStringGenerator = require('../utils/random-string-generator');
const fcmSendNotification = require('../helper/fcm-notifications');

module.exports = (model, req, res, customerId) => {
    const { Order, OrderTracker, OrderItem, OrderItemServices } = model;

    const body = {
        order_id: `SO${moment
            .utc()
            .format('YYMMDD')}${randomStringGenerator()}`,
        customer_id: customerId,
        order_type_id: req.body.order_type_id,
        store_id: req.body.store_id,
        payment_method_id: req.body.payment_method_id,
        payment_status: req.body.payment_status,
        partnership_id: req.body.partnership_id,
        promo_id: req.body.promo_id,
        pickup_delivery_price: req.body.pickup_delivery_price,
        potongan: req.body.potongan,
        order_date: moment().tz('Asia/Jakarta'),
        order_status_id: req.body.order_status_id,
        qty: req.body.qty,
        total: req.body.total
    };

    Order.create(body).then(async (data) => {
        if (req.body.items && req.body.items.length > 0) {
            const arrItems = req.body.items.map((item) => {
                return {
                    item_id: uuidv4(),
                    order_id: data.order_id,
                    item_name: item.item_name,
                    services_id: item.services_id,
                    subtotal: item.subtotal,
                    note: item.note
                };
            });

            OrderItem.bulkCreate(arrItems)
                .then((dataItems) => {
                    const arrServices = arrItems.reduce((prev, item) => {
                        const appended = item.services_id.map((service_id) => {
                            return {
                                item_id: item.item_id,
                                service_id: service_id
                            };
                        });
                        return [...prev, ...appended];
                    }, []);

                    OrderItemServices.bulkCreate(arrServices)
                        .then((dataServices) => {
                            callback.single(200, res, {
                                ...data.dataValues,
                                item: dataItems.map((item) => {
                                    return {
                                        ...item.dataValues,
                                        service: dataServices
                                    };
                                })
                            });
                        })
                        .catch((err) => callback.error(500, err.message));
                })
                .catch((err) => callback.error(500, err.message));
        } else {
            callback.single(200, res, data);
        }
        await OrderTracker.create({
            order_id: data.dataValues.order_id,
            order_status_id: data.dataValues.order_status_id
        });
        
        fcmSendNotification(
            'Transaksi Baru',
            `Transaksi atas nama ${data.customer_name} berhasil dibuat. Cek sekarang!`,
            data.dataValues.order_id
        );
    });
};
