const db = require('../../models/db')
const callback = require('../../presenter/callback');
const MasterServiceCategory = db.master_service_category;

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await MasterServiceCategory.findAndCountAll();
            return callback.list(200, req, res, data);
        } catch (err) {
            return callback.error(500, res, err.message);
        }
    },
}