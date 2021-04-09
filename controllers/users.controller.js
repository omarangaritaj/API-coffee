const { request, response } = require('express')
const bcryptjs = require("bcryptjs");

const User = require('../models/user.models');
const Role = require('../models/role.models');


const usersGet = async(req = request, res = response) => {

    const { untilPage = 5, fromPage = 0 } = req.query;
    const query = { state: true };
    const [users, totalUsers] = await Promise.all([
        User.find(query).skip(Number(fromPage)).limit(Number(untilPage)),
        User.countDocuments(query),
    ]);


    res.status(200).json({ users, totalUsers });
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
    const { _id, password, ...rest } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const hasUser = await User.findByIdAndUpdate(id, rest);

    res.status(202).json(hasUser);
}


const usersPatch = (req = request, res = response) => {
    res.status(202).json({ method: "PATCH" });
}


const usersDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const hasUser = await User.findByIdAndUpdate(id, { state: false });

    res.status(202).json(hasUser);
};

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