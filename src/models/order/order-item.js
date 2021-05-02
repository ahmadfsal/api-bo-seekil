module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('order_item', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        item_id: {
            type: Sequelize.STRING(100),
        },
        order_id: {
            type: Sequelize.STRING(100)
        },
        item_name: {
            type: Sequelize.STRING(255)
        },
        subtotal: {
            type: Sequelize.DOUBLE()
        },
        note: {
            type: Sequelize.STRING(255)
        }
    });

    return OrderItem;
};
