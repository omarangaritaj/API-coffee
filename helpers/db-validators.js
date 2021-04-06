const Role = require('../models/role.models');
const User = require('../models/user.models');

const roleExists = async(role = "") => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role} isnt exist`);
    }
};

const emailExists = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The email ${email} exist`);
    }
};


module.exports = {
    roleExists,
    emailExists
};