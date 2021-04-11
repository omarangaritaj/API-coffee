const { Router } = require("express");
const { check } = require("express-validator");


const {
    categoriesGet,
    categorieByIdGet,
    categoriePost,
    categoriePut,
    categorieDelete,
} = require("../controllers/categories.controller");

const {
    validateField,
    validateJwt,
    isAdminRole,
    hasRole,
} = require("../middleware");

const { idCategoriesExists } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/categories
 */

router.get("/", categoriesGet);

router.get("/:id", categorieByIdGet);

router.post(
    "/", [
        validateJwt,
        check("name", "The name isnt empty.").not().isEmpty(),
        validateField,
    ],
    categoriePost
);

router.put(
    "/:id", [
        validateJwt,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idCategoriesExists),
        validateField,
    ],
    categoriePut
);

router.delete(
    "/:id", [
        validateJwt,
        isAdminRole,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idCategoriesExists),
        validateField,
    ],
    categorieDelete
);


module.exports = router;