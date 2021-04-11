const { response, request } = require("express");

const categories = (req = request, res = response) => {
    res.status(200).json({ msj: "all ok" });
};

module.exports = {
    categories,
};