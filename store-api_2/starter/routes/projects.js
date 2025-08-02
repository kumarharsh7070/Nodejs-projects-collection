const express = require("express")
const { getAllproduct, getAllproductsstatic } = require("../controller/products")
const router = express.Router()


 router.route('/').get(getAllproduct)
 router.route('/static').get(getAllproductsstatic)

 module.exports = router