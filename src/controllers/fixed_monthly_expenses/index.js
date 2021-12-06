const { Sequileze } = require('../../models/db');
const db = require('../../models/db');
const callback = require('../../presenter/callback');
const Op = Sequileze.Op;
const moment = require('moment');
const FixedMonthlyExpenses = db.fixed_monthly_expenses;
const SpendingMoney = db.store_spending_money;
const OrderItems = db.order_item;

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
            return;
        }

        const body = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        };

        FixedMonthlyExpenses.create(body)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findAll: (req, res) => {
        FixedMonthlyExpenses.findAndCountAll({
            order: [['name', 'ASC']]
        })
            .then((data) => {
                const total = data.rows.reduce(
                    (acc, curr) => acc + curr['price'],
                    0
                );
                return res.status(200).send({
                    total,
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
    findOne: (req, res) => {
        const { id } = req.params;

        FixedMonthlyExpenses.findOne({ where: { id: id } })
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    countAllIncomeAndExpenditure: async (req, res) => {
        try {
            // const firstDay = `${moment()
            //     .startOf('month')
            //     .format('YYYY-DD-MM')} 00:00:00`;
            // const lastDay = `${moment()
            //     .endOf('month')
            //     .format('YYYY-DD-MM')} 23:59:59`;
            // const orderItemsData = await OrderItems.findAll({
            //     where: {
            //         order_date: {
            //             [Op.gte]: firstDay,
            //             [Op.lte]: lastDay
            //         }
            //     }
            // });
            // const spendingMoneyData = await SpendingMoney.findAll({
            //     where: {
            //         createdAt: {
            //             [Op.gte]: firstDay,
            //             [Op.lte]: lastDay
            //         }
            //     }
            // });
            const fixedMonthlyExpenses = await FixedMonthlyExpenses.findAll();
            // const totalOrderItems = orderItemsData.reduce(
            //     (acc, curr) => acc + curr['total'],
            //     0
            // );
            // const totalSpendingMoney = spendingMoneyData.reduce((acc, curr) => {
            //     return acc + curr['price'], 0;
            // });

            // const totalFixedMonthlyExpenses = data.reduce((acc, curr) => {
            //     return acc + curr['price'], 0;
            // });

            // const total =
            //     totalOrderItems +
            //     (totalFixedMonthlyExpenses + totalSpendingMoney);

            return res.status(200).send({
                // total_income: totalOrderItems, // total pemasukan
                // total_spending_money: totalSpendingMoney, // total pengeluarn
                // total_fixed_monthly_expenses: totalFixedMonthlyExpenses,
                // total,
                fixedMonthlyExpenses,
                // orderItemsData,
                // spendingMoneyData,
                meta: {
                    code: 200,
                    status: 'OK'
                }
            });
        } catch (e) {}
    },
    update: (req, res) => {
        const id = req.params.id;

        FixedMonthlyExpenses.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    FixedMonthlyExpenses.findOne({ where: { id: id } }).then(
                        (data) => {
                            callback.single(200, res, data);
                        }
                    );
                } else {
                    callback.update(200, res, 'failed', id);
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    delete: (req, res) => {
        const id = req.params.id;

        FixedMonthlyExpenses.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    deleteAll: (req, res) => {
        FixedMonthlyExpenses.destroy({
            where: {},
            truncate: false
        })
            .then((nums) =>
                res.send({ message: `${nums} were deleted successfully!` })
            )
            .catch((err) => callback.error(500, res, err.message));
    }
};
