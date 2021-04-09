const jwt = require('jsonwebtoken');
const { request, response } = require('express');



const validateJwt = (req = request, res = response, next) => {

    const errorMsj = (message) => {
        res.status(401).json({ msg: message });
    }

    const token = req.header('x-token');
    if (!token) {
        return errorMsj("Token is not defined on the headers");
    }

    try {
        jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        next();
    } catch (error) {
        errorMsj("Token Invalid")
    }
}


module.exports = {
    validateJwt
}