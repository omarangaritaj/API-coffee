const Product = require("../controllers/product.controller");
const Auth = require("../controllers/auth.controller");
const Default = require("../controllers/default.controller");
const User = require("../controllers/users.controller");
const Categories = require("../controllers/categories.controller");


module.exports = {
    ...Product,
    ...Auth,
    ...Default,
    ...User,
    ...Categories,
}