module.exports = (sequelize, Sequelize) => {
    const MasterStore = sequelize.define('master_store', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        staging: {
            type: Sequelize.STRING(100)
        },
        address: {
            type: Sequelize.STRING(255)
        },
    })

    return MasterStore
}
