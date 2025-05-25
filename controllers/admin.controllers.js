const Peoducts = require("../models/product.model");

function getProducts(req,res) {
    res.render("admin/products/all-products.ejs")
}

function getNewProducts(req,res) {
    res.render("admin/products/new-products.ejs");
}

async function createNewProduct(req, res, next) {
  const product = new Peoducts(
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
    return
  }

    res.redirect("/admin/products")
}

module.exports = {
  getProducts: getProducts,
  getNewProducts:getNewProducts,
  createNewProduct:createNewProduct
};
