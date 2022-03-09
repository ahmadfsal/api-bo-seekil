const db = require('../../models/db');
const CustomerMember = db.customer_member;
const Customer = db.customer;
const callback = require('../../presenter/callback');
const generateAccessToken = require('../../middleware/generate-access-token');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils/pagination');

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
            return;
        }

        const body = {
            member_id: req.body.member_id,
            customer_id: req.body.customer_id,
            member_join_date: req.body.member_join_date,
            expired_date: req.body.member_join_date
        };

        CustomerMember.create(body)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    findAll: async (req, res) => {
        const { member_id, page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        try {
            delete req.query.member_id;
            delete req.query.page;
            delete req.query.size;

            CustomerMember.belongsTo(Customer, { foreignKey: 'customer_id' });

            const data = await CustomerMember.findAndCountAll({
                limit,
                offset,
                where: {
                    [Op.and]: [
                        req.query,
                        member_id
                            ? { member_id: { [Op.substring]: member_id } }
                            : {}
                    ]
                }
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

    findOne: (req, res) => {
        const { member_id } = req.params;

        CustomerMember.findOne({ where: { member_id } })
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    login: async (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Email or Passowrd cannot be empty'
            });
            return;
        }

        CustomerMember.findOne({ where: { member_id } })
            .then((data) => {
                if (data) {
                    const token = generateAccessToken({
                        data: data.dataValues
                    });
                    callback.single(200, res, {
                        ...data.dataValues,
                        token: token
                    });
                } else {
                    callback.single(
                        200,
                        res,
                        null,
                        'Akun tidak ditemukan, periksa kembali ID Member Anda'
                    );
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    update: (req, res) => {
        const member_id = req.params.member_id;

        CustomerMember.update(req.body, { where: { member_id } })
            .then((num) => {
                if (num == 1) {
                    CustomerMember.findOne({ where: { member_id } }).then(
                        (data) => callback.single(200, res, data)
                    );
                } else {
                    callback.update(200, res, 'failed', member_id);
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    delete: (req, res) => {
        const member_id = req.params.member_id;

        CustomerMember.destroy({ where: { member_id: member_id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', member_id);
                else callback.delete(200, res, 'failed', member_id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    deleteAll: (req, res) => {
        CustomerMember.destroy({
            where: {},
            truncate: false
        })
            .then((nums) =>
                res.send({ message: `${nums} were deleted successfully!` })
            )
            .catch((err) => callback.error(500, res, err.message));
    }
};
