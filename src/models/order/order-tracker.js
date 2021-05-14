module.exports = (sequelize, Sequelize) => {
    const OrderTracker = sequelize.define('order_tracker', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        order_id: {
            type: Sequelize.STRING(100)
        },
        order_status_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: 'master_status',
                key: 'id',
            }
        },
    });

    return OrderTracker;
};
