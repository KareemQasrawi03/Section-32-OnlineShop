const mongodb = require("mongodb");
const db = require("../data/database");

class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = date ? new Date(date) : new Date();
    this.formattedDate = this.date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    this.id = orderId ? new mongodb.ObjectId(orderId) : null;
  }

  // Save the order (create or update)
  async save() {
    const orderDocument = {
      userData: this.userData,
      productData: this.productData,
      date: new Date(),
      status: this.status,
    };

    const database = await db.getDb();

    if (this.id) {
      // Update an existing order
      return await database
        .collection("orders")
        .updateOne({ _id: this.id }, { $set: orderDocument });
    } else {
      // Create a new order
      return await database.collection("orders").insertOne(orderDocument);
    }
  }

  // Transform a single order document into an Order instance
  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  // Transform multiple order documents into Order instances
  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  // Find all orders
  static async findAll() {
    const database = await db.getDb();
    const orders = await database
      .collection("orders")
      .find()
      .sort({ _id: -1 }) // Sort by most recent
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  // Find all orders for a specific user
  static async findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);
    console.log(uid);

    const database = await db.getDb();
    const orders = await database
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 }) // Sort by most recent
      .toArray();
    console.log(orders);

    return this.transformOrderDocuments(orders);
  }

  // Find a specific order by ID
  static async findById(orderId) {
    const database = await db.getDb();
    const order = await database
      .collection("orders")
      .findOne({ _id: new mongodb.ObjectId(orderId) });

    if (!order) {
      throw new Error("Order not found!");
    }

    return this.transformOrderDocument(order);
  }
}

module.exports = Order;
