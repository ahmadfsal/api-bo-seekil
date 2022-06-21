const { Op } = require('sequelize');
const db = require('../../models/db');
const Services = db.master_services;
const callback = require('../../presenter/callback');
const MasterServiceCategory = db.master_service_category;

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            callback.error(400, res, 'Content can not be empty!');
            return;
        }

        Services.create(req.body)
            .then((data) => {
                if (data) callback.create(200, res, 'success', data);
            })
            .catch((err) => callback.create(200, res, 'failed', data));
    },

    findAll: async (req, res) => {
        try {
            Services.belongsTo(MasterServiceCategory, { foreignKey: 'category_id' });
            const data = await Services.findAndCountAll({
                order: [['name', 'ASC']],
                where: req.query,
                include: [
                    {
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        },
                        model: MasterServiceCategory,
                        required: false
                    },
                ]
            })
            return callback.list(200, req, res, data);
        } catch (err) {
            callback.error(500, res, err.message);
        }
    },

    findOne: (req, res) => {
        const id = req.params.id;

        Services.findByPk(id)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },

    update: (req, res) => {
        const id = req.params.id;

        Services.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) callback.update(200, res, 'success', id);
                else callback.update(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    delete: (req, res) => {
        const id = req.params.id;

        Services.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },

    deleteAll: (req, res) => {
        Services.destroy({
            where: {},
            truncate: false
        })
            .then((nums) => {
                res.send({ message: `${nums} were deleted successfully!` });
            })
            .catch((err) => callback.error(500, res, err.message));
    }
};
