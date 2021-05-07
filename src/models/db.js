const dbConfig = require('../config/db.config')
const Sequileze = require('sequelize')

const sequelize = new Sequileze(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    freezeTableName: true,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
        freezeTableName: true,
        timestamps: true
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire
    }
})

const db = {}

db.Sequileze = Sequileze
db.sequelize = sequelize

db.order = require('./order/order')(sequelize, Sequileze)
db.order_item = require('./order/order-item')(sequelize, Sequileze)
db.order_item_services = require('./order/order-item-services')(sequelize, Sequileze)
db.order_tracker = require('./order/order-tracker')(sequelize, Sequileze)
db.master_type = require('./master/master-type')(sequelize, Sequileze)
db.master_status = require('./master/master-status')(sequelize, Sequileze)
db.master_partnership = require('./master/master-partnership')(sequelize, Sequileze)
db.master_products = require('./master/master-products')(sequelize, Sequileze)
db.master_services = require('./master/master-services')(sequelize, Sequileze)
db.master_promo = require('./master/master-promo')(sequelize, Sequileze)
db.customer = require('./customer')(sequelize, Sequileze)

module.exports = db