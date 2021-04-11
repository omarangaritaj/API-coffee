const { Router } = require("express");
const { check } = require("express-validator");


const {
    getCategories,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorie,
} = require("../controllers/categories.controller");

const {
    validateField,
    validateJwt,
    isAdminRole
} = require("../middleware");

const { idCategoriesExists } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/categories
 */

router.get("/", getCategories);

router.get(
    "/:id", [
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idCategoriesExists),
        validateField,
    ],
    getCategorieById
);

router.post(
    "/", [
        validateJwt,
        check("name", "The name isnt empty.").not().isEmpty(),
        validateField,
    ],
    createCategorie
);

router.put(
    "/:id", [
        validateJwt,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idCategoriesExists),
        check("name", "The name isnt empty.").not().isEmpty(),
        validateField,
    ],
    updateCategorie
);

router.delete(
    "/:id", [
        validateJwt,
        isAdminRole,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idCategoriesExists),
        validateField,
    ],
    deleteCategorie
);


module.exports = router;