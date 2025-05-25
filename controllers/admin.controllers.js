function getProducts(req,res) {
    res.render("admin/products/all-products.ejs")
}

function getNewProducts(req,res) {
    res.render("admin/products/new-products.ejs");
}

function createNewProduct(){

}

module.exports = {
  getProducts: getProducts,
  getNewProducts:getNewProducts,
  createNewProduct:createNewProduct
};
