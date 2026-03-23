const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  reviews: Number,
  image: String,
  images: [String],
  colors: [String],
  category: String,
  subcategory: String,
  sizes: [
    {
      size: String,
      available: Boolean
    }
  ],
  description: String,
}, { timestamps: true });

productSchema.index({ category: 1, subcategory: 1, brand: 1 });

productSchema.index({ price: 1 });

productSchema.index({ name: 'text', brand: 'text' });

module.exports = mongoose.model("Products", productSchema)
