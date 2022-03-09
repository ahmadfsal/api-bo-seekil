module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        customer_id: {
            type: Sequelize.STRING(100),
            references: {
                model: 'customer_member',
                key: 'customer_id'
            }
        },
        name: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(100)
        },
        password: {
            type: Sequelize.TEXT()
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
