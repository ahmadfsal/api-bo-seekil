const Sequileze = require('sequelize');

const sequelize = new Sequileze(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        freezeTableName: true,
        host: process.env.DB_HOST,
        dialect: 'mysql',
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
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

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
db.customer_member = require('./customer/member')(sequelize, Sequileze);
// Auth
db.auth = require('./auth')(sequelize, Sequileze);
// Spending Money = Table Pengeluaran
db.store_spending_money = require('./spending_money')(sequelize, Sequileze);
// Fixed Monthly Expenses = Table Pengeluaran tetap bulanan
db.fixed_monthly_expenses = require('./fixed_monthly_expenses')(
    sequelize,
    Sequileze
);

module.exports = db;
