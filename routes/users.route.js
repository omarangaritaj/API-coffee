const { Router } = require('express');
const { check } = require('express-validator');
const { validacionCampos } = require("../middleware/validacion-campos");
const {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
    rolePost
} = require('../controllers/users.controller')

const Role = require('../models/role.models')


const router = Router();

router.get("/", usersGet);
router.post(
    "/", [
        check("name", "The name isnt empty.").not().isEmpty(),
        check("email", "The email isnt valid.").isEmail(),
        check("password", "The password hasnt have 6 digits").isLength({ min: 6 }),
        // check("role", "The role isnt valid.").isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check("role").custom(async(role = '') => {
            const existRole = await Role.findOne({ role });
            if (!existRole) {
                throw new Error(`The role ${role} isnt exist`);
            }
        }),
        validacionCampos
    ],
    usersPost
);
router.put("/", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

router.post("/role", rolePost);


module.exports = router