import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const sizeSchema = mongoose.Schema({
  size: { type: String, required: true },
  available: { type: Boolean, default: true },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true, // Faltu spaces remove karega
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      lowercase: true, // Queries aasaan banane ke liye
      index: true, // Search fast karega
    },
    subcategory: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
   countInStock: {
    type: Number,
    required: true,
    default: 20, // ✅ Naye products ke liye hamesha default stock rahega
},
    sizes: [sizeSchema],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// 2+ Year Exp Touch 1: Text Indexing for Global Search
// Isse Name, Brand aur Category par fast keyword search chalega
productSchema.index({ name: 'text', brand: 'text', tags: 'text' });

// 2+ Year Exp Touch 2: Auto Discount Calculation (Pre-save Hook)
// Har baar manual calculation ki zarurat nahi, model khud calculate karega
productSchema.pre("save", function (next) {
  if (this.originalPrice > 0) {
    this.discount = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  next();
});

// 2+ Year Exp Touch 3: Virtual Field
// Kya product out of stock hai? Ye UI ko decide karne mein help karta hai
productSchema.virtual('isOutOfStock').get(function() {
    return this.countInStock <= 0;
});

const Product = mongoose.model("Product", productSchema);

export default Product;