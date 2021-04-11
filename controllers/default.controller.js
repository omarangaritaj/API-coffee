const { response, request } = require('express')


const defaultAll = (req = request, res = response) => {
    res.status(404).json({ error: "Not Found" });
}


module.exports = {
    defaultAll
};