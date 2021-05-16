const db = require('../../models/db');
const OrderTracker = db.order_tracker;
const MasterStatus = db.master_status;
const callback = require('../../presenter/callback');

module.exports = {
    findAll: (req, res) => {
        OrderTracker.findAll()
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    findByOrderId: (req, res) => {
        const { order_id } = req.params;

        OrderTracker.belongsTo(MasterStatus, { foreignKey: 'order_status_id' });

        OrderTracker.findAll({
            where: { order_id: order_id },
            order: [['updatedAt', 'DESC']],
            include: [
                {
                    attributes: { exclude: ['id', 'createdAt'] },
                    model: MasterStatus,
                    required: false
                }
            ]
        })
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    update: (req, res) => {
        const order_id = req.params.order_id;

        OrderTracker.findOne({ where: { order_id: order_id } })
            .then((result) => {
                if (result.status === 200) {
                    OrderTracker.update({
                        where: { order_id: order_id }
                    }).then((resultUpdate) => {
                        if (resultUpdate.status === 200) {
                            callback.update(200, res, 'success', id);
                        }
                    });
                }
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    delete: (req, res) => {
        const id = req.params.id;

        OrderTracker.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    deleteAll: (req, res) => {
        OrderTracker.destroy({
            where: {},
            truncate: false
        })
            .then((nums) => {
                res.send({ message: `${nums} were deleted successfully!` });
            })
            .catch((err) => callback.error(500, res, err.message));
    }
};
