module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING(100)
        },
        whatsapp: {
            type: Sequelize.STRING(15)
        },
        gender: {
            type: Sequelize.STRING(20)
        },
        birthday: {
            type: Sequelize.DATE()
        },
        points: {
            type: Sequelize.DOUBLE()
        },
        address: {
            type: Sequelize.STRING(255)
        }
    });

    return Customer;
};
