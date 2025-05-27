const express = require("express");
const productsController = require("../controllers/products.controllers");

const router = express.Router();

router.get("/products", productsController.getAllProducts);

router.get("/products/:id", productsController.getDetailesProduct);

module.exports = router;
