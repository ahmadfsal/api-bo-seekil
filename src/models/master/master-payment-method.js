module.exports = (sequelize, Sequelize) => {
    const MasterPaymentMethod = sequelize.define('master_payment_method', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(100)
        }
    });

    return MasterPaymentMethod;
};
