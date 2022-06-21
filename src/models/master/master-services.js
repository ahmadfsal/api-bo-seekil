module.exports = (sequelize, Sequelize) => {
    const MasterService = sequelize.define('master_services', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(100)
        },
        estimate: {
            type: Sequelize.STRING(15)
        },
        price: {
            type: Sequelize.DOUBLE
        },
        description: {
            type: Sequelize.STRING(255)
        },
        category_id: {
            type: Sequelize.INTEGER(),
            references: {
                model: 'master_service_category',
                key: 'id'
            }
        }
    })

    return MasterService
}
