module.exports = (sequelize, Sequelize) => {
    const MasterPartnership = sequelize.define('master_partnership', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(255)
        },
        address: {
            type: Sequelize.STRING(255)
        },
    })

    return MasterPartnership
}
