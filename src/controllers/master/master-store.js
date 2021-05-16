const db = require('../../models/db');
const callback = require('../../presenter/callback');
const MasterStore = db.master_store;

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            callback.error(400, res, 'Content can not be empty!');
            return;
        }

        MasterStore.create(req.body)
            .then((data) => {
                if (data) callback.create(200, res, 'success', data);
            })
            .catch((err) => callback.create(200, res, 'failed', data));
    },
    findAll: (req, res) => {
        MasterStore.findAll()
            .then((data) => callback.list(200, req, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    findOne: (req, res) => {
        const id = req.params.id;
    
        MasterStore.findByPk(id)
            .then((data) => callback.single(200, res, data))
            .catch((err) => callback.error(500, res, err.message));
    },
    update: (req, res) => {
        const id = req.params.id;
    
        MasterStore.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) callback.update(200, res, 'success', id);
                else callback.update(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    delete: (req, res) => {
        const id = req.params.id;
    
        MasterStore.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) callback.delete(200, res, 'success', id);
                else callback.delete(200, res, 'failed', id);
            })
            .catch((err) => callback.error(500, res, err.message));
    },
    deleteAll: (req, res) => {
        MasterStore.destroy({
            where: {},
            truncate: false
        })
            .then((nums) => {
                res.send({ message: `${nums} were deleted successfully!` });
            })
            .catch((err) => callback.error(500, res, err.message));
    }
};