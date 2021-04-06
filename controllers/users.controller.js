const { request, response } = require('express')
const bcryptjs = require("bcryptjs");

const User = require('../models/user.models');
const Role = require('../models/role.models');


const usersGet = async(req = request, res = response) => {
    user = await User.find();
    res.status(200).json({ user });
}


const usersPost = (req = request, res = response) => {

    const { name, email, password, role } = req.body
    const salt = bcryptjs.genSaltSync();

    const user = new User({ name, email, password, role });
    user.password = bcryptjs.hashSync(password, salt);
    user.save();

    res.status(201).json({ user });
}


const usersPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, email, ...rest } = req.body;
    const existId = await User.findByIdAndUpdate(id, rest);

    // const existId = await idExists(id)



    res.status(202).json({ method: "PUT", existId });
}


const usersPatch = (req = request, res = response) => {
    res.status(202).json({ method: "PATCH" });
}


const usersDelete = (req = request, res = response) => {
    res.status(202).json({ method: "DELETE" });
}

const rolePost = (req = request, res = response) => {
    let { role } = req.body;
    role = role.toUpperCase();
    const role_May = new Role({ role });
    role_May.save();
    res.status(201).json({ msg: "Role created", role: role_May });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
    rolePost
};