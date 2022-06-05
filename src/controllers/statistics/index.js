const db = require('../../models/db')
const callback = require('../../presenter/callback');

module.exports = {
    monthInYear: async (req, res) => {
        try {
            const [result] = await db.sequelize.query(
                "SELECT MONTHNAME(order_date), YEAR(order_date), SUM(total), SUM(qty)"+
                "FROM `order` GROUP BY YEAR(order_date), MONTH(order_date)"
            );
            const data = result.map((e, i) => {
                return {
                    year: e['YEAR(order_date)'],
                    month: e['MONTHNAME(order_date)'],
                    total_items: parseInt(e['SUM(qty)']),
                    total: e['SUM(total)'],
                }
            });


            return res.status(200).send({
                list: data,
                meta: {
                    code: 200,
                    status: 'OK'
                }
            });
        } catch (err) {
            return callback.error(500, res, err.message);
        }
    }
}