const validateFields = require("../middleware/validate-fields");
const validateJwt = require("../middleware/validate-jwt");
const validateRole = require("../middleware/validate-role");



module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRole
};