module.exports = (sequelize, Sequelize) => {
    const OrderItemServices = sequelize.define('order_item_services', {
        id: {
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        item_id: {
            type: Sequelize.STRING(100),
            references: {
                model: 'order_item',
                key: 'item_id'
            }
        },
        service_id: {
            type: Sequelize.INTEGER(11)
        },
    });

    return OrderItemServices;
};
