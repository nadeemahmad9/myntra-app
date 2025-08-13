const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")
const User = require("../models/userModel")



const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id), // ✅ keep token here
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePic: user.profilePic || "", // optional
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * Google Login or Register
 */
const googleAuth = asyncHandler(async (req, res) => {
  const { name, email, picture } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Google account must have an email");
  }

  let user = await User.findOne({ email: email.trim().toLowerCase() });

  if (!user) {
    // Create new user with secure dummy password
    user = await User.create({
      name: name?.trim() || "Google User",
      email: email.trim().toLowerCase(),
      password: `${Date.now()}_${Math.random().toString(36).slice(-8)}`, // secure placeholder
      profilePic: picture || "",
    });
  } else {
    // Update profile pic if changed
    if (picture && user.profilePic !== picture) {
      user.profilePic = picture;
      await user.save();
    }
  }

  res.json({
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic || "",
      isAdmin: user.isAdmin,
    },
  });
});



const registerUser = asyncHandler(async (req, res) => {
const { name, email, password, phone } = req.body.name;

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      phone,
      
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  } catch (error) {
    console.error("User registration error:", error.message)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})



const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})


const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  googleAuth,
}




// const asyncHandler = require("express-async-handler");
// const generateToken = require("../utils/generateToken");
// const User = require("../models/userModel");

// /**
//  * Google Login or Register
//  */
// const googleAuth = asyncHandler(async (req, res) => {
//   const { name, email, picture } = req.body;

//   if (!email) {
//     res.status(400);
//     throw new Error("Google account must have an email");
//   }

//   let user = await User.findOne({ email: email.trim().toLowerCase() });

//   if (!user) {
//     // Create new user with secure dummy password
//     user = await User.create({
//       name: name?.trim() || "Google User",
//       email: email.trim().toLowerCase(),
//       password: `${Date.now()}_${Math.random().toString(36).slice(-8)}`, // secure placeholder
//       profilePic: picture || "",
//     });
//   } else {
//     // Update profile pic if changed
//     if (picture && user.profilePic !== picture) {
//       user.profilePic = picture;
//       await user.save();
//     }
//   }

//   res.json({
//     token: generateToken(user._id),
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       profilePic: user.profilePic || "",
//       isAdmin: user.isAdmin,
//     },
//   });
// });

// module.exports = { googleAuth };
