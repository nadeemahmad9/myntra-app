require("dotenv").config()
const mongoose = require("mongoose")
const Product = require("./models/products")
const products = require("./data/products")

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected")

    // Clear existing products
    await Product.deleteMany()
    console.log("Old products removed")

    // Insert fresh products
    await Product.insertMany(products)
    console.log("New products inserted successfully")

    mongoose.disconnect()
    console.log("MongoDB Disconnected")
  } catch (err) {
    console.error("Error seeding data:", err)
    process.exit(1)
  }
}

seedDatabase()
