const Product = require("../models/product.model");
async function getCart(req, res) {
  const cart = res.locals.cart; // Retrieve the cart from res.locals
  res.render("customer/cart/cart", { items: cart.items }); // Pass items to the template
}
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
    newTotalItems : res.locals.cart.totalQuantity
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
};
