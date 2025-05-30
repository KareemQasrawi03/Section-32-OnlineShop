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
  constructor(items = []) {
    this.items = items;
    this.totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
  }
  addItem(product) {
    const existingItem = this.items.find(
      (item) => item.productId === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ productId: product.id, quantity: 1 });
    }
    this.totalQuantity++;
  }
}

module.exports = Cart;
