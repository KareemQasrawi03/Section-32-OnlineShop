const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controllers");

router.get("/products", adminController.getProducts); // /admin/products

router.get("/products/new", adminController.getNewProducts);

router.post("/products/new", adminController.createNewProduct);

module.exports = router;
