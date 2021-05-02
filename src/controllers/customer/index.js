const db = require('../../models/db');
const Customer = db.customer;
const error_message = 'Error occurred';

exports.create = (req, res) => {
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
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};

exports.findAll = (req, res) => {
    Customer.findAll({
        order: [['createdAt', 'DESC']],
    })
        .then((data) => {
            res.send({
                list: data,
                meta: {
                    code: 200,
                    status: 'OK',
                    message: 'Success'
                }
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Customer.findOne({
        where: {
            id: id
        }
    })
        .then((data) => {
            res.send({
                list: data,
                meta: {
                    code: 200,
                    status: 'OK',
                    message: 'Success'
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: `Error retrieving id=${order_id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Customer.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Updated successfully.' });
            } else {
                res.send({
                    message: `Cannot update id=${id}`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating id=' + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Customer.destroy({
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'deleted successfully!' });
            } else {
                res.send({
                    message: `Cannot delete id=${id}`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete id=${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    Customer.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({ message: `${nums} were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || error_message
            });
        });
};
