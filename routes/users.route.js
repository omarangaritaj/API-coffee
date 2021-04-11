const { Router } = require('express');
const { check } = require('express-validator');


const { validateField, validateJwt, isAdminRole, hasRole } = require('../middleware');

const {
    roleExists,
    emailExists,
    idUserExists
} = require("../helpers/db-validators");
const {
    usersGet,
    usersCreate,
    usersUpdate,
    usersDelete,
    rolePost,
} = require("../controllers/users.controller");



const router = Router();

/**
 * {{url}}/api/users
 */

router.get("/", usersGet);

router.post(
    "/", [
        check("name", "The name isnt empty.").not().isEmpty(),
        check("email").custom(emailExists),
        check("password", "The password hasnt have 6 digits").isLength({ min: 6 }),
        check("role").custom(roleExists),
        validateField,
    ],
    usersCreate
);

router.put(
    "/:id", [
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idUserExists),
        validateField,
    ],
    usersUpdate
);

router.delete(
    "/:id", [
        validateJwt,
        // isAdminRole,
        hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check("id", "The ID is not valid").isMongoId(),
        check("id").custom(idUserExists),
        validateField,
    ],
    usersDelete
);

router.post("/role", rolePost);


module.exports = router