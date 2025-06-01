const Order = require("../models/order.model");
const User = require("../models/users.model");

async function getOrder(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    console.log(orders);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }
  req.session.cart = null; // when click buy Product cleare data

  res.redirect("/orders");
}

module.exports = {
  addOrder: addOrder,
  getOrder: getOrder,
};
