const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let authHeader = req.headers['authorization'];

    if (!authHeader) {

        return res.status(401).json({
            success: false
        })
    }

    try {

        let decoded = jwt.verify(authHeader, process.env.JWT_SECRET);

        req.auth = decoded;

        next();

    } catch(err) {

        console.error(err);

        res.status(401).json({
            success: false
        })
    }
}