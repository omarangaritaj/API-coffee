const { response } = require('express')

const usersGet = (req, res = response) => {
    res.status(200).json({ method: "GET" });
}
const usersPost = (req, res = response) => {
    const body = req.body;
    res.status(201).json({ method: "POST" });
}
const usersPut = (req, res = response) => {
    res.status(202).json({ method: "PUT" });
}
const usersPatch = (req, res = response) => {
    res.status(202).json({ method: "PATCH" });
}
const usersDelete = (req, res = response) => {
    res.status(202).json({ method: "DELETE" });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
};