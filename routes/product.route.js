const { Router } = require("express");
const { check } = require("express-validator");


const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers");

const {
    validateField,
    validateJwt,
    isAdminRole,
} = require("../middleware");

const {
    idProductExists,
    idUserExists,
    idCategoriesExists,
    priceGreater0,
} = require("../helpers/db-validators");

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
        check("categoryId").custom(idCategoriesExists),
        validateField,
    ],
    createProduct
);

router.put(
    "/:id", [
        validateJwt,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idProductExists),
        check("price").custom(priceGreater0),
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