const db = require('../../models/db');
const Customer = db.customer;
const callback = require('../../presenter/callback');

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
            whatsapp: req.body.whatsapp
        };

        Customer.create(body)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findAll: (req, res) => {
        Customer.findAndCountAll({
            order: [['createdAt', 'DESC']]
        })
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findOne: (req, res) => {
        const { id } = req.params;

        Customer.findOne({ where: { id: id } })
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    update: (req, res) => {
        const id = req.params.id;

        Customer.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    Customer.findOne({ where: { id: id } }).then((data) => {
                        callback.single(200, res, data);
                    });
                } else {
                    callback.update(200, res, 'failed', id);
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    delete: (req, res) => {
        const id = req.params.id;

        Customer.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    deleteAll: (req, res) => {
        Customer.destroy({
            where: {},
            truncate: false
        })
            .then((nums) =>
                res.send({ message: `${nums} were deleted successfully!` })
            )
            .catch((err) => callback.error(500, res, err.message));
    }
};
