import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Security: Queries mein password by default nahi aayega
    },
    profilePic: {
      type: String,
      default: "default-avatar.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    // ✅ FIX: Object ko Array mein badla gaya hai
    addresses: [
      {
        name: String,
        phone: String,
        pincode: String,
        address: String, // Street/House detail
        city: String,
        state: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 2+ Year Exp Touch 1: Pre-save Hook (Password Hashing)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 2+ Year Exp Touch 2: Instance Method to Match Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 2+ Year Exp Touch 3: Instance Method to Generate Token
// Controller se token logic hata kar model mein laana "Best Practice" hai
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "30d" }
  );
};

const User = mongoose.model("User", userSchema);

export default User;