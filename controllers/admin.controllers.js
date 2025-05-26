const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    console.log(products);
    res.render("admin/products/all-products.ejs", { products: products });
  } catch (err) {
    next(err);
    return;
  }
}

function getNewProducts(req, res) {
  res.render("admin/products/new-products.ejs");
}

async function createNewProduct(req, res, next) {
  const product = new Product(
    req.body.title,
    req.file.filename,
    req.body.summary,
    req.body.price,
    req.body.description
  );

  try {
    await product.save(); // save the product to the database
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getNewProducts: getNewProducts,
  createNewProduct: createNewProduct,
};
