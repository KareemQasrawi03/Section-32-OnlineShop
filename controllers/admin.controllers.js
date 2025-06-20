const Product = require("../models/product.model");
const Order = require("../models/order.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    // console.log(products);
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

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product.ejs", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = new Product(
      req.body.title,
      req.file ? req.file.filename : null,
      req.body.summary,
      req.body.price,
      req.body.description,
      req.params.id // Pass the ID from the route parameter
    );

    if (req.file) {
      product.replaceImage(req.file.filename); // Replace the old image with the new one
    }

    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  // console.log(req.params.id)
  try {
    let product = await Product.findById(req.params.id);
    // console.log(product)
    await product.remove(); 
    res.redirect("/admin/products"); 
    // res.json({message:"Delete Product!"})
  } catch (error) {
    next(error); 
  }
}
async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    console.log(orders);
    res.render("admin/orders/admin-orders", {
      orders: orders,
      isAdmin: true,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProducts: getNewProducts,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
