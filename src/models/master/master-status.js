module.exports = (sequelize, Sequelize) => {
    const MasterStatus = sequelize.define('master_status', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(20)
        },
        description: {
            type: Sequelize.STRING(255)
        }
    });

    return MasterStatus;
};
