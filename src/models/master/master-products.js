module.exports = (sequelize, Sequelize) => {
    const MasterProduct = sequelize.define('master_products', {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(255)
        },
        price: {
            type: Sequelize.DOUBLE
        },
        stock: {
            type: Sequelize.INTEGER(11)
        },
    })

    return MasterProduct
}
