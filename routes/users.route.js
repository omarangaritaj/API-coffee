const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require("../middleware/validate-fields");
const { validateJwt } = require("../middleware/validate-jwt");

const {
    roleExists,
    emailExists,
    idExists
} = require("../helpers/db-validators");
const {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
    rolePost
} = require('../controllers/users.controller');



const router = Router();

router.get("/", usersGet);

router.post(
    "/", [
        check("name", "The name isnt empty.").not().isEmpty(),
        check("email").custom(emailExists),
        check("password", "The password hasnt have 6 digits").isLength({ min: 6 }),
        check("role").custom(roleExists),
        validateField,
    ],
    usersPost
);

router.put(
    "/:id", [
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idExists),
        validateField,
    ],
    usersPut
);

router.patch("/:id", usersPatch);

router.delete(
    "/:id", [
        validateJwt,
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idExists),
        validateField,
    ],
    usersDelete
);

router.post("/role", rolePost);


module.exports = router