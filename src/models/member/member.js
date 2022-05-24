module.exports = (sequelize, Sequelize) => {
    const CustomerMember = sequelize.define('customer_member', {
        id: {
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        member_id: {
            type: Sequelize.STRING(100)
        },
        customer_id: {
            type: Sequelize.STRING(255)
        },
        member_join_date: {
            type: Sequelize.DATE()
        },
        expired_date: {
            type: Sequelize.DATE()
        }
    });

    return CustomerMember;
};
