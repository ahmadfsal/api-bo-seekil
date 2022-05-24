module.exports = (sequelize, Sequelize) => {
    const MemberPoints = sequelize.define('member_points', {
        id: {
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        member_id: {
            type: Sequelize.STRING(255)
        },
        order_id: {
            type: Sequelize.STRING(100)
        },
        point: {
            type: Sequelize.INTEGER(20)
        },
        flag: {
            type: Sequelize.STRING(20),
        }
    });

    return MemberPoints;
};
