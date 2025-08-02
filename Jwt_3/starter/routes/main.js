const express = require("express")
const router=express.Router()

const {login,dashboard} = require("../controller/main")

router.route('/dashboard').get(dashboard)
router.route("/login").post(login)

module.exports = router