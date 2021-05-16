const axios = require('axios');
const generatePdf = require('../../utils/generate-pdf');
const pdfContent = require('../../presenter/pdf-content');
const callback = require('../../presenter/callback');
const db = require('../../models/db');
const Order = db.order;

module.exports = {
    generate_invoice: (req, res) => {
        const order_id = req.params.order_id;
        const BASE_URL = process.env.BASE_URL;

        Order.findOne({ where: { order_id: order_id } })
            .then(async (response) => {
                if (response) {
                    const getToken = await axios.post(
                        `${BASE_URL}/auth/token`,
                        {
                            username: 'it.min'
                        }
                    );

                    const headers = {
                        headers: {
                            Authorization: `Bearer ${getToken.data.token}`
                        }
                    };

                    const orderDetail = await axios
                        .get(`${BASE_URL}/order/${order_id}`, headers)
                        .then((response) => response.data.data);

                    const arrayItems = await axios
                        .get(`${BASE_URL}/order/item/${order_id}`, headers)
                        .then((response) => response.data);

                    const fetchServicesByItemId = (item) => {
                        if (item.item_id) {
                            return axios
                                .get(
                                    `${BASE_URL}/order/item/${item.item_id}/services`,
                                    headers
                                )
                                .then((response) => {
                                    const arrService = response.data.list.map(
                                        (item) => {
                                            return {
                                                value: item.master_service.id,
                                                label: item.master_service.name,
                                                price: item.master_service.price
                                            };
                                        }
                                    );
                                    return arrService;
                                });
                        }
                    };

                    const arrayItemsWithServices = await Promise.all(
                        arrayItems.list.map(async (item) => {
                            const po = await fetchServicesByItemId(item).then(
                                (respo) => respo
                            );
                            item.services_id = po;
                            return item;
                        })
                    );

                    const objectData = {
                        ...orderDetail,
                        items: arrayItemsWithServices
                    };

                    generatePdf(pdfContent(objectData), (response) => {
                        callback.single(200, res, response);
                    });
                } else {
                    callback.error(404, res, `order_id=${order_id} not found`);
                }
            })
            .catch((error) => {
                callback.error(500, res, error.message);
            });
    }
};
