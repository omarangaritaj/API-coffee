const Role = require('../models/role.models');
const User = require('../models/user.models');
const Categorie = require("../models/categories.models");


const roleExists = async(role = "") => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role} isnt exist`);
    }
};


const emailExists = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The email ${email} aready exist`);
    }
};


const idUserExists = async(id = "") => {
    const existId = await User.findById(id);
    if (!existId) {
        throw new Error(`The id ${id} dont exist`);
    }
};

const idCategoriesExists = async(id = "") => {
    const existId = await Categorie.findById(id);
    if (!existId || existId.state === false) {
        throw new Error(`The id ${id} dont exist`);
    }
};


module.exports = {
    roleExists,
    emailExists,
    idUserExists,
    idCategoriesExists
};