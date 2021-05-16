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
        whatsapp: {
            type: Sequelize.STRING(15)
        },
        address: {
            type: Sequelize.STRING(255)
        },
        potongan: {
            type: Sequelize.DOUBLE()
        },
        drop_zone: {
            type: Sequelize.INTEGER()
        },
        start_date: {
            type: Sequelize.DATE()
        },
        end_date: {
            type: Sequelize.DATE()
        },
    })

    return MasterPartnership
}
