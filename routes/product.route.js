const { Router } = require("express");
const { check } = require("express-validator");


const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

const {
    validateField,
    validateJwt,
    isAdminRole
} = require("../middleware");

const { idProductExists } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/products
 */

router.get("/", getProducts);

router.get(
    "/:id", [
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idProductExists),
        validateField,
    ],
    getProductById
);

router.post(
    "/", [
        validateJwt,
        check("name", "The name isnt empty.").not().isEmpty(),
        validateField,
    ],
    createProduct
);

router.put(
    "/:id", [
        validateJwt,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idProductExists),
        check("name", "The name isnt empty.").not().isEmpty(),
        validateField,
    ],
    updateProduct
);

router.delete(
    "/:id", [
        validateJwt,
        isAdminRole,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idProductExists),
        validateField,
    ],
    deleteProduct
);


module.exports = router;