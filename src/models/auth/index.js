module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        username: {
            type: Sequelize.STRING(100)
        },
        password: {
            type: Sequelize.STRING(255)
        },
        level: {
            type: Sequelize.STRING(20)
        }
    });

    return User;
};
