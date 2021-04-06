const { request, response } = require('express')
const bcryptjs = require("bcryptjs");

const User = require('../models/user.models');
const Role = require('../models/role.models');


const usersGet = (req = request, res = response) => {
    res.status(200).json({ method: "GET" });
}


const usersPost = (req = request, res = response) => {

    const salt = bcryptjs.genSaltSync();
    const { name, email, password, role } = req.body

    const user = new User({ name, email, password, role });
    user.password = bcryptjs.hashSync(password, salt);

    user.save();
    res.status(201).json({ user });
}


const usersPut = (req = request, res = response) => {
    res.status(202).json({ method: "PUT" });
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