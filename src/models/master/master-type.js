module.exports = (sequelize, Sequelize) => {
    const MasterType = sequelize.define('master_type', {
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

    return MasterType;
};
