module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        order_id: {
            type: Sequelize.STRING(100)
        },
        customer_id: {
            type: Sequelize.INTEGER()
        },
        order_type_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'master_type',
                key: 'id'
            }
        },
        store_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'master_store',
                key: 'id'
            }
        },
        payment_method_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'master_payment_method',
                key: 'id'
            }
        },
        payment_status: {
            type: Sequelize.STRING(20),
        },
        partnership_id: {
            type: Sequelize.INTEGER(11)
        },
        promo_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'master_promo',
                key: 'promo_id'
            }
        },
        pickup_delivery_price: {
            type: Sequelize.DOUBLE
        },
        potongan: {
            type: Sequelize.DOUBLE
        },
        order_date: {
            type: Sequelize.DATE
        },
        order_status_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'master_status',
                key: 'id',
            }
        },
        qty: {
            type: Sequelize.INTEGER(11)
        },
        total: {
            type: Sequelize.DOUBLE
        }
    });

    return Order;
};
