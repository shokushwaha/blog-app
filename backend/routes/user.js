const router = require('express').Router()

const { registerUser } = require("../controllers/user")
router.post("/register", registerUser);


module.exports = router;
