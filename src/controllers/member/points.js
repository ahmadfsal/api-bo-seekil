const db = require('../../models/db');
const MemberPoints = db.member_points;
const callback = require('../../presenter/callback');
const { getPagination, getPagingData } = require('../../utils/pagination');

module.exports = {
    create: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: 'Content can not be empty!'
            });
        }

        const body = {
            member_id: req.body.member_id,
            order_id: req.body.order_id,
            point: req.body.point,
            flag: req.body.flag,
        };

        try {
            const data = await MemberPoints.create(body);
            return callback.single(200, res, data);
        } catch (err) {
            return callback.error(500, res, err.message);
        }
    },

    findAll: async (req, res) => {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const member_id = req.params.member_id;

        try {
            delete req.query.page;
            delete req.query.size;

            const data = await MemberPoints.findAndCountAll({
                limit,
                offset,
                where: { member_id: member_id }
            });

            return res.status(200).send({
                list: data.rows,
                pagination: getPagingData(data, page, limit),
                meta: {
                    code: 200,
                    status: 'OK'
                }
            });
        } catch (err) {
            callback.error(500, res, err.message);
        }
    },

    update: async (req, res) => {
        const member_id = req.params.member_id;

        try {
            const num = await MemberPoints.update(req.body, {
                where: { member_id }
            });

            if (num == 1) {
                const data = await MemberPoints.findOne({
                    where: { member_id }
                });
                return callback.single(200, res, data);
            } else {
                return callback.update(200, res, 'failed', member_id);
            }
        } catch (err) {
            return callback.error(500, res, err.message);
        }
    }
};
