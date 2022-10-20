
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {

    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).json({
            msg: "Acesso negado"
        })
    }

    try {
        
        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret)   

        next();

    }catch (err) {
        return res.status(401).json({
            msg: "Acesso negado"
        })
    }

}

module.exports = checkToken;