const { Router } = require('express');
const { defaultAll } = require('../controllers/default.controller')



const router = Router();

// All the routes should be return a 404 error if doesnt find the route
router.get("/", defaultAll);
router.post("/", defaultAll);
router.put("/", defaultAll);
router.patch("/", defaultAll);
router.delete("/", defaultAll);



module.exports = router