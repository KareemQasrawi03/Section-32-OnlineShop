const db = require("../data/database");
const mongodb = require("mongodb");
class Product {
  constructor(title, image, summary, price, description, id) {
    (this.title = title),
      (this.image = image), //the name of the image file
      (this.summary = summary),
      (this.price = +price), // convert string to number
      (this.description = description);
    this.updateImageData();
    this.id = id ? id.toString() : null;
  }
  static async findById(productId) {
    let prodId;
    let database;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    database = await db.getDb();
    const product = await database
      .collection("products")
      .findOne({ _id: prodId });
    if (!product) {
      const error = new Error("Could not find product with provided id.");
      error.code = 404;
      throw error;
    }
    // Map the database object to a Product instance
    return new Product(
      product.title,
      product.image,
      product.summary,
      product.price,
      product.description,
      product._id
    );
  }

  static async findAll() {
    const database = await db.getDb();
    const products = await database.collection("products").find().toArray();
    // console.log(products);

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
  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });
    let database = await db.getDb()

    const products = await database
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    (this.imagePath = `product-data/images/${this.image}`),
      (this.imageUrl = `/products/assets/images/${this.image}`);
  }

  async save() {
    const productData = {
      title: this.title,
      image: this.image, //the name of the image file
      summary: this.summary,
      price: this.price,
      description: this.description,
    };
    const database = await db.getDb();

    if (this.id) {
      // Update existing product
      const prodId = new mongodb.ObjectId(this.id);

      // Remove the `image` field if no new image is provided
      if (!this.image) {
        delete productData.image;
      }
      const updateResult = await database
        .collection("products")
        .updateOne({ _id: prodId }, { $set: productData });

      return updateResult;
    } else {
      // Insert new product
      const insertResult = await database
        .collection("products")
        .insertOne(productData);
      return insertResult;
    }
  }
  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  async remove() {
    const prodId = new mongodb.ObjectId(this.id);
    const database = await db.getDb();
    await database.collection("products").deleteOne({ _id: prodId });
  }
}

module.exports = Product;
