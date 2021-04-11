const { response, request } = require("express");
const { Product } = require("../models");
const { capitalize } = require('../helpers/capitalize')


const getProducts = async(req = request, res = response) => {

    const { untilPage = 10, fromPage = 0 } = req.query;
    const query = { state: true };
    const [products, totalProducts] = await Promise.all([

        Product.find(query)
        .populate('user', 'categorie')
        .skip(Number(fromPage))
        .limit(Number(untilPage)),
        Product.countDocuments(query),
    ]);

    res.status(200).json({ products, totalProducts });
};


const getProductById = async(req = request, res = response) => {

    const { id } = req.params;
    const categorieDB = await Product.findById(id)
        .populate(
            "user",
            "categorie"
        );

    res.status(200).json(categorieDB);
};


const createProduct = async(req = request, res = response) => {


    //TODO Hacer que si el producto fue borrado, activarlo nuevamente

    const { id } = req.user;
    const { name, categoryId, price, available } = req.body;

    const nameCapitalize = capitalize(name);

    const productDB = await Product.findOne({ name: nameCapitalize });

    if (productDB) {
        res.status(400).json({ error: "The Product is already exist" });
    }
    if (price < 0) {
        res.status(400).json({ error: "The Price should be grater or equal of 0" });
    }

    const product = new Product({
        name: nameCapitalize,
        state: true,
        user: id,
        category: categoryId,
        available,
    });
    product.save();

    res.status(201).json({ product });
};

const updateProduct = async(req = request, res = response) => {

    const { id } = req.params
    const { state, user, ...data } = req.body
    data.name = capitalize(data.name)

    const category = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({ category });
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