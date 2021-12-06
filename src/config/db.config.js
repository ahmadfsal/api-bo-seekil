module.exports = {
    HOST: 'us-cdbr-east-03.cleardb.com',
    USER: 'b6a7797112d512',
    PASSWORD: '8f7e52a7',
    DB: 'heroku_a03e37da7d4e3f4her',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}