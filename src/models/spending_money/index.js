module.exports = (sequelize, Sequelize) => {
    const StoreSpendingMoney = sequelize.define('store_spending_money', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING(100)
        },
        description: {
            type: Sequelize.STRING(255)
        },
        price: {
            type: Sequelize.INTEGER
        }
    });

    return StoreSpendingMoney;
};
