const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middleware/validate-fields");
const { authController } = require("../controllers/auth.controller");


const router = Router();

router.post(
    "/login", [
        check("password", "The password its mandatory").not().isEmpty(),
        validateField,
    ],
    authController
);


module.exports = router