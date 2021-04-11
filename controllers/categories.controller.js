const { response, request } = require("express");
const { Categorie } = require('../models')


const categoriesGet = async(req = request, res = response) => {

    const categories = await Categorie.find()

    res.status(200).json(categories);
};


const categorieByIdGet = async(req = request, res = response) => {

    const { id } = req.params;
    console.log(id);
    const categorieDB = await Categorie.findById(id);

    res.status(200).json(categorieDB);
};


const categoriePost = async(req = request, res = response) => {
    const { id } = req.user

    const { name, status } = req.body
    const categorie = await new Categorie({ name, status, user: id })
    categorie.save();

    res.status(201).json({ msj: "created", categorie })
};

const categoriePut = async(req = request, res = response) => {

    const { id } = req.params
    const { name } = req.body

    const categorie = await Categorie.findByIdAndUpdate(id, name);

    res.status(201).json({ msj: "Updated", categorie })
};

const categorieDelete = async(req = request, res = response) => {

    const { id } = req.params

    const categorie = await Categorie.findByIdAndUpdate(id, { state: false });

    res.status(201).json({ msj: "Deleted", categorie })
};

module.exports = {
    categoriesGet,
    categorieByIdGet,
    categoriePost,
    categoriePut,
    categorieDelete
};