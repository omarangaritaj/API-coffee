const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const authController = (req = request, res = response) => {



    res.status(201).json({ auth: "ok" });
};



module.exports = {
    authController
}