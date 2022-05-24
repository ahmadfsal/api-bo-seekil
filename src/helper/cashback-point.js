const { customer_member, member_points } = require('../models/db');
const callback = require('../presenter/callback');

module.exports = async (req, res, data) => {
    if (data.payment_status === 'lunas') {
        // check if customer is member
        if (data.customer_member != null) {
            try {
                // get customer member data
                const data = await customer_member.findOne({
                    where: { customer_id: data.customer_id }
                });

                if (data !== null) {
                    // check valid expire date of membership
                    if (moment().isSameOrBefore(moment(data.expired_date))) {
                        const updatePoint = await member_points.update(
                            {
                                member_id: data.customer_member.member_id,
                                order_id: data.order_id,
                                point: data.total * (10 / 100)
                            },
                            {
                                where: {
                                    member_id: data.customer_member.member_id
                                }
                            }
                        );

                        /// if success update point
                        if (updatePoint === 1) {
                            return res.status(200);
                        } else {
                            return res.status(400);
                        }
                    }
                }
            } catch (err) {
                callback.error(500, res, err.message);
            }
        }
    }
};
