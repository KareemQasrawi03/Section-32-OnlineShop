const Product = require("../models/product.model");
async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  res.locals.cart.addItem(product);
  req.session.cart = res.locals.cart
//   req.session.save()
  res.status(201).json({
    message:"Cart Updated!",
    newTotaleItems : cart.totalQuantity
  })
}

module.exports = {
  addCartItem: addCartItem,
};
