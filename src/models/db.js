const dbConfig = require('../config/db.config');
const Sequileze = require('sequelize');

const sequelize = new Sequileze(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    freezeTableName: true,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
        freezeTableName: true,
        timestamps: true
    },
    dialectOptions: {
        useUTC: false, // for reading from database
        dateStrings: true,
        timezone: 'local',
        typeCast(field, next) {
            // for reading from database
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        }
    },
    timezone: 'Asia/Jakarta',
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire
    }
});

const db = {};

db.Sequileze = Sequileze;
db.sequelize = sequelize;

// Order
db.order = require('./order/order')(sequelize, Sequileze);
db.order_item = require('./order/order-item')(sequelize, Sequileze);
db.order_item_services = require('./order/order-item-services')(
    sequelize,
    Sequileze
);
db.order_tracker = require('./order/order-tracker')(sequelize, Sequileze);
// Master
db.master_type = require('./master/master-type')(sequelize, Sequileze);
db.master_status = require('./master/master-status')(sequelize, Sequileze);
db.master_partnership = require('./master/master-partnership')(
    sequelize,
    Sequileze
);
db.master_products = require('./master/master-products')(sequelize, Sequileze);
db.master_services = require('./master/master-services')(sequelize, Sequileze);
db.master_promo = require('./master/master-promo')(sequelize, Sequileze);
db.master_store = require('./master/master-store')(sequelize, Sequileze);
db.master_payment_method = require('./master/master-payment-method')(
    sequelize,
    Sequileze
);
// Customer
db.customer = require('./customer/customer')(sequelize, Sequileze);
// Auth
db.auth = require('./auth')(sequelize, Sequileze);
// Spending Money = Table Pengeluaran
db.store_spending_money = require('./spending_money')(sequelize, Sequileze);
// Fixed Monthly Expenses = Table Pengeluaran tetap bulanan
db.fixed_monthly_expenses = require('./fixed_monthly_expenses')(sequelize, Sequileze);

module.exports = db;
