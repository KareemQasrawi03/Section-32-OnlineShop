const db = require("../data/database");
class Product {
  constructor(title, image, summary, price, description, id) {
    (this.title = title),
      (this.image = image), //the name of the image file
      (this.summary = summary),
      (this.price = +price), // convert string to number
      (this.description = description);
    (this.imagePath = `product-data/images/${image}`),
      (this.imageUrl = `/products/assets/images/${image}`);
    this.id = id ? id.toString() : null;
  }

  static async findAll() {
    const database = await db.getDb();
    const products = await database.collection("products").find().toArray();
    console.log(products);

    // Map the database documents to Product instances
    return products.map(function (productDocument) {
      return new Product(
        productDocument.title,
        productDocument.image,
        productDocument.summary,
        productDocument.price,
        productDocument.description,
        productDocument._id
      );
    });
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
