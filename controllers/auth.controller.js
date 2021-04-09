const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user.models");
const { generateToken } = require("../helpers/generate-token");

const authController = async(req = request, res = response) => {

    try {
        const { email, password } = req.body;

        const sendError = () => {
            res.status(400).json({
                msg: "Email or password are incorrect or the email doesnt exist"
            });
        };

        const existEmailInDB = await User.findOne({ email });
        const passUserDB = existEmailInDB.password;

        if (!existEmailInDB) { return sendError() }
        if (!bcryptjs.compareSync(password, passUserDB)) {
            return sendError();
        }

        const token = await generateToken(existEmailInDB.id);

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Please contact to administrator" })
    }

};



module.exports = {
    authController
}