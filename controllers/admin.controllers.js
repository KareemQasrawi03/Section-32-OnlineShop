function getProducts(req,res) {
    res.render("admin/products/all-products.ejs")
}

function getNewProducts(req,res) {
    res.render("admin/products/new-products.ejs");
}

function createNewProduct(req,res){
    console.log(req.body)
    console.log(req.file)
    res.redirect("/admin/products")
}

module.exports = {
  getProducts: getProducts,
  getNewProducts:getNewProducts,
  createNewProduct:createNewProduct
};
