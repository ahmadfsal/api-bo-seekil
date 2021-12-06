module.exports = (sequelize, Sequelize) => {
    const fixedMonthlyExpenses = sequelize.define('store_fixed_monthly_expenses', {
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

    return fixedMonthlyExpenses;
};
