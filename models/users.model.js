const db = require("../data/database");
const bcrypt = require("bcryptjs");
class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postal: postal,
      city: city,
    };
  }

  async getUserWithSameEmail() {
    let database;
    database = await db.getDb();
    return database.collection("users").findOne({ email: this.email });
  }

  async existsAlready(){
    const existingUser = await this.getUserWithSameEmail()
    if(existingUser){
      return
    }
    return false
  }

  async signup() {
    let database;
    const hashedPassword = await bcrypt.hash(this.password, 12);
    database = await db.getDb();
    await database.collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullname: this.fullname,
      address: this.address,
    });
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
