const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const User = require("../models/user.models");


const errorMsj = (message, codeStatus) => {
    res.status(codeStatus).json({ msg: message });
}

const validateJwt = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return errorMsj("Token is not defined on the headers", 401);
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        user = await User.findById(payload.uid);

        if (!user || !user.state) {
            return errorMsj('Token is Invalid', 401)
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        errorMsj("Error: Token Invalid", 401)
    }
}


module.exports = {
    validateJwt
}