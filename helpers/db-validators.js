const {
    Role,
    User,
    Categorie,
    Product
} = require('../models')


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
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The user with id ${id} dont exist`);
    }
};

const idCategoriesExists = async(id = "") => {
    const existCategory = await Categorie.findById(id);
    if (!existCategory || existCategory.state === false) {
        throw new Error(`The category with the id ${id} dont exist`);
    }
};

const idProductExists = async(id = "") => {
    const existProduct = await Product.findById(id);
    if (!existProduct || existProduct.state === false) {
        throw new Error(`The Product with the id ${id} dont exist`);
    }
};

const priceGreater0 = async(price = 0) => {

    if (price < 0) {
        throw new Error(`The Price should be grater or equal of 0`);
    }
};




module.exports = {
    roleExists,
    emailExists,
    idUserExists,
    idCategoriesExists,
    idProductExists,
    priceGreater0,
};