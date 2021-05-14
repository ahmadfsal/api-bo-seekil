const jwt = require('jsonwebtoken');

module.exports = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3h' });
};
