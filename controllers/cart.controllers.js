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

async function updateCartItem(req, res, next) {
  const productId = req.body.productId;
  const newQuantity = parseInt(req.body.newQuantity, 10);

  try {
    res.locals.cart.updateItem(productId, newQuantity);
    req.session.cart = res.locals.cart;

    const newTotalQuantity = res.locals.cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    res.status(200).json({
      message: "Cart updated successfully!",
      updatedCartItem: res.locals.cart.items.find(
        (item) => item.product.id === productId
      ) || { quantity: 0 },
      newTotalPrice: res.locals.cart.totalPrice,
      newTotalQuantity: newTotalQuantity,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item." });
  }
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
