const { response, request } = require("express");
const { Product } = require("../models");
const { capitalize } = require('../helpers/capitalize')


const getProducts = async(req = request, res = response) => {

    const { untilPage = 10, fromPage = 0 } = req.query;
    const query = { state: true };
    const [products, totalProducts] = await Promise.all([

        Product.find(query)
        .populate('user', 'categorie', 'name')
        .skip(Number(fromPage))
        .limit(Number(untilPage)),
        Product.countDocuments(query),
    ]);

    res.status(200).json({ products, totalProducts });
};


const getProductById = async(req = request, res = response) => {

    const { id } = req.params;
    const categorieDB = await Product.findById(id).populate(
        "user",
        "categorie",
        "name"
    );

    res.status(200).json(categorieDB);
};


const createProduct = async(req = request, res = response) => {
    const { id } = req.user
    const { name } = req.body;

    const nameCapitalize = capitalize(name);

    const productDB = await Product.findOne({ name: nameCapitalize });

    if (productDB) {
        res.status(400).json({ error: "The Product is already exist" });
    }

    const categorie = new Product({ name: nameCapitalize, status: true, user: id });
    categorie.save();

    res.status(201).json({ msj: "created", categorie });
};

const updateProduct = async(req = request, res = response) => {

    const { id } = req.params
    const { state, user, ...data } = req.body
    data.name = capitalize(data.name)
    console.log(data.name);

    const categorie = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({ msj: "Updated", product });
};

const deleteProduct = async(req = request, res = response) => {

    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

    res.status(201).json({ msj: "Deleted", product })
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};