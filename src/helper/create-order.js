const { v4: uuidv4 } = require('uuid');

const createOrder = (model, req, res, data) => {
    const { Customer, OrderItem, OrderItemServices } = model;

    const insertCustomer = (req) => {
        const { customer_id, customer_name, whatsapp, pickup_address } =
            req.body;

        Customer.upsert({
            id: customer_id,
            name: customer_name,
            whatsapp: whatsapp,
            address: pickup_address
        })
            .then(() => {})
            .catch(() => {});
    };

    const insertItems = (req, res, data) => {
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
                            res.send({
                                data: {
                                    ...data.dataValues,
                                    item: dataItems.map((item) => {
                                        return {
                                            ...item.dataValues,
                                            service: dataServices
                                        };
                                    })
                                },
                                meta: {
                                    status: 200,
                                    message: 'Success'
                                }
                            });
                        })
                        .catch((err) => {
                            console.log(`err insert service: ${err}`);
                            res.status(500).send({
                                message: err.message || error_message
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || error_message
                    });
                });
        } else {
            return res.send({
                data: data,
                meta: {
                    status: 200,
                    message: 'Success'
                }
            });
        }
    };

    return {
        doCreateCustomer: insertCustomer(req),
        doCreateItem: insertItems(req, res, data),
    };
};

module.exports = createOrder;
