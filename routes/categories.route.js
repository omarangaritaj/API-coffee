const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middleware/validate-fields");
const { categories } = require("../controllers/categories.controller");

const router = Router();

/**
 * {{url}}/api/categories
 */

router.get("/", categories);


module.exports = router;