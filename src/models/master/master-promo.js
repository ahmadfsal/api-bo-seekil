module.exports = (sequelize, Sequelize) => {
    const MasterTopping = sequelize.define('master_promo', {
        id: {
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100)
        },
        code: {
            type: Sequelize.STRING(10)
        },
        discount: {
            type: Sequelize.DOUBLE()
        },
        description: {
            type: Sequelize.TEXT()
        },
        start_date: {
            type: Sequelize.DATE()
        },
        end_date: {
            type: Sequelize.DATE()
        },
        status: {
            type: Sequelize.INTEGER(1)
        },
    });

    return MasterTopping;
};
