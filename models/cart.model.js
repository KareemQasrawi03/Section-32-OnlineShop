// class Cart {
//   constructor(items = [], totalQuantity = 0, totalPrice = 0) {
//     //empty array
//     this.items = items;
//     this.totalQuantity = totalQuantity;
//     this.totalPrice = totalPrice;
//   }
//   addItem(product) {
//     const cartItem = {
//       product: product,
//       quantity: 1,
//       totalPrice: product.price,
//     };

//     for (let i = 0; i < this.items.length; i++) {
//       const item = this.items[i];
//       if (item.product.id === product.id) {
//         cartItem.quantity = cartItem.quantity + 1;
//         cartItem.totalPrice = cartItem.totalPrice + product.price;
//         this.items[i] = cartItem;

//         this.totalQuantity++;
//         this.totalPrice = this.totalPrice + product.price;

//         return;
//       }
//     }

//     this.items.push(cartItem);
//     this.totalQuantity++;
//     this.totalPrice = this.totalPrice + product.price;
//   }
// }

// module.exports = Cart;
const Product = require("./product.model");
class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items; // Array of cart items
    this.totalQuantity = totalQuantity; // Total quantity of all items in the cart
    this.totalPrice = totalPrice; // Total price of all items in the cart

    if (items.length > 0) {
      this.totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      this.totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  }
  async updatePrices() {
    const productIds = this.items.map(function (item) {
      return item.product.id;
    });

    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(function (prod) {
        return prod.id === cartItem.product.id;
      });

      if (!product) {
        // product was deleted!
        // "schedule" for removal from cart
        deletableCartItemProductIds.push(cartItem.product.id);
        continue;
      }

      // product was not deleted
      // set product data and total price to latest price from database
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableCartItemProductIds.indexOf(item.product.id) < 0;
      });
    }

    // re-calculate cart totals
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }
  addItem(product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice += product.price;
    } else {
      this.items.push({
        product: product,
        quantity: 1,
        totalPrice: product.price,
      });
    }
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === productId
    );

    if (existingItemIndex === -1) {
      return;
    }
    const existingItem = this.items[existingItemIndex];

    if (newQuantity > 0) {
      const quantityDifference = newQuantity - existingItem.quantity;
      existingItem.quantity = newQuantity;
      existingItem.totalPrice = existingItem.product.price * newQuantity;

      this.totalQuantity += quantityDifference;
      this.totalPrice += quantityDifference * existingItem.product.price;
    } else {
      this.items.splice(existingItemIndex, 1);

      this.totalQuantity -= existingItem.quantity;
      this.totalPrice -= existingItem.totalPrice;
    }
  }
}

module.exports = Cart;
