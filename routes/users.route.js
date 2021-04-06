const { Router } = require('express');
const { check } = require('express-validator');
const { validacionCampos } = require("../middleware/validacion-campos");
const { roleExists, emailExists } = require("../helpers/db-validators");
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
        validacionCampos,
    ],
    usersPost
);
router.put("/", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

router.post("/role", rolePost);


module.exports = router