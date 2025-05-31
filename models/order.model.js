const db = require("../data/database");
class Order {
  //satus => pending , fullfailed , cancellled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  async save() {
    const orderDocument = {
      userData: this.userData,
      productData: this.productData,
      date: new Date(),
      status: this.status,
    };

    const database = await db.getDb();

    if (this.id) {
    } else {
      return await database.collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
