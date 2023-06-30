const token = require('jsonwebtoken');
const { promisify } = require('util');

const decryptToken = async(authHeader) => {
// Bearer [token] from front-end
    const [, token] = authHeader.split(' ');

    return promisify(jwt.verify)(token, process.env.HASH_BCRYPT)
}

module.exports = { decryptToken };