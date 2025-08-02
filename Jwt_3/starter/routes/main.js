const express = require("express")
const router=express.Router()

const {login,dashboard} = require("../controller/main")

const authticationMiddleware =require('../middleware/auth')

router.route('/dashboard').get(authticationMiddleware,dashboard)
router.route("/login").post(login)

module.exports = router