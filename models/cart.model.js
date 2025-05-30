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
}

module.exports = Cart;
