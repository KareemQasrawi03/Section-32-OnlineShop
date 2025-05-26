const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controllers");
const imageUploadMiddleware = require("../middlewares/image-upload")

router.get("/products", adminController.getProducts); // /admin/products

router.get("/products/new", adminController.getNewProducts);

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.get("/products/:id", adminController.getUpdateProduct);

router.post("/products/:id", adminController.updateProduct);

module.exports = router;
