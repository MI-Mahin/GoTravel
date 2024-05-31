const jwt = require('jsonwebtoken');
const app = require('../server');

const authMiddleware = async (req, res, next) => {
    const { crudToken } = req.cookies;

    if (crudToken) {
        try {
            const decodedToken = await jwt.verify(crudToken, 'secretkey');
            req.userInfo = decodedToken;
            next();

        } catch (error) {
            return res.status(401).redirect('/auth/login');
        }
    } else {
        return res.status(401).redirect('/auth/login');
    }
    
}

module.exports = authMiddleware;