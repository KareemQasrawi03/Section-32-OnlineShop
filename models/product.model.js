const db = require("../data/database");
class Product {
  constructor(title, image, summary, price, description) {
    (this.title = title),
      (this.image = image), //the name of the image file
      (this.summary = summary),
      (this.price = +price), // convert string to number
      (this.description = description);
    (this.imagePath = `product-data/images/${image}`),
      (this.imgeUrl = `products/assets/images/${image}`);
  }

  async save() {
    const productData = {
      title: this.title,
      image: this.image, //the name of the image file
      summary: this.summary,
      price: this.price,
      description: this.description,
    };
    let database = await db.getDb();
    const addProduct = await database
      .collection("products")
      .insertOne(productData);
  }
}

module.exports = Product;
