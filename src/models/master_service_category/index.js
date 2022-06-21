module.exports = (sequelize, Sequelize) => {
    const MasterServiceCategory = sequelize.define('master_sevice_category', {
        id: {
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: Sequelize.STRING(20),
        },
    });
    
    return MasterServiceCategory;
}