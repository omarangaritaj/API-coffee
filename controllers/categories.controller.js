const { response, request } = require("express");
const { Categorie } = require('../models');
const { capitalize } = require('../helpers/capitalize')


const getCategories = async(req = request, res = response) => {

    const { untilPage = 10, fromPage = 0 } = req.query;
    const query = { state: true };
    const [categories, totalCategories] = await Promise.all([

        Categorie.find(query)
        .populate('user', 'name')
        .skip(Number(fromPage))
        .limit(Number(untilPage)),
        Categorie.countDocuments(query),
    ]);

    res.status(200).json({ categories, totalCategories });
};


const getCategorieById = async(req = request, res = response) => {

    const { id } = req.params;
    const categorieDB = await Categorie.findById(id)
        .populate('user', 'name');

    res.status(200).json(categorieDB);
};


const createCategorie = async(req = request, res = response) => {


    //TODO Hacer que si la categoria fue borrada, activarlo nuevamente
    const { id } = req.user;
    const { name } = req.body;

    const nameCapitalize = capitalize(name);

    const categorieDB = await Categorie.findOne({ name: nameCapitalize });

    if (categorieDB) {
        res.status(400).json({ error: "The Categorie is already exist" });
    }

    const categorie = new Categorie({
        name: nameCapitalize,
        status: true,
        user: id,
    });
    categorie.save();

    res.status(201).json({ msj: "created", categorie });
};

const updateCategorie = async(req = request, res = response) => {

    const { id } = req.params
    const { state, user, ...data } = req.body
    data.name = capitalize(data.name)
    console.log(data.name);

    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({ msj: "Updated", categorie })
};

const deleteCategorie = async(req = request, res = response) => {

    const { id } = req.params

    const categorie = await Categorie.findByIdAndUpdate(id, { state: false }, { new: true });

    res.status(201).json({ msj: "Deleted", categorie })
};

module.exports = {
    getCategories,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorie
};