const mongodb = require("mongodb"); // Import the mongodb module
const MongoClient = mongodb.MongoClient; // Get the MongoClient class from the mongodb module

let database;
async function connect() {
  const client = await MongoClient.connect("mongodb://localhost:27017"); // Connect to the MongoDB server
  database = client.db("online-shop"); // Select the 'online-shop' database
}

async function getDb() {
  if (!database) {
    throw new Error("You must connect first!"); // Throw an error if the database is not connected
  }
  return database; // Return the connected database instance
}

module.exports = {
  connectToDatabase: connect, // Export the connect function
  getDb: getDb, // Export the getDb function
};
