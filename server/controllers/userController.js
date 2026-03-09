import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";

// Helper function to send token in Cookie
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.generateToken();
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profilePic: user.profilePic,
            },
        });
};

// @desc    Auth user & get token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, "Please provide email and password");

    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.matchPassword(password))) {
        sendTokenResponse(user, 200, res);
    } else {
        throw new ApiError(401, "Invalid email or password");
    }
});

// @desc    Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) throw new ApiError(400, "User already exists");

    const user = await User.create({ name, email, password, phone });
    sendTokenResponse(user, 201, res);
});

// @desc    Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");
    res.status(200).json({ success: true, user });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        // Token generate karein
        const token = updatedUser.generateToken();

        // Professional Response: Isme saare fields bhejein taaki Redux sync rahe
        res.status(200).json({
            success: true,
            token,
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isAdmin: updatedUser.isAdmin,
                profilePic: updatedUser.profilePic,
                addresses: updatedUser.addresses, // ✅ Ye bhejni zaroori hai
            },
        });
    } else {
        throw new ApiError(404, "User not found");
    }
});

// @desc    Logout user
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

// @desc    Google Auth
const googleAuth = asyncHandler(async (req, res) => {
    const { name, email, picture } = req.body;
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        user = await User.create({
            name,
            email: email.toLowerCase(),
            password: Math.random().toString(36).slice(-10),
            profilePic: picture,
        });
    }
    sendTokenResponse(user, 200, res);
});

// ================= ADMIN CONTROLLERS =================

// @desc    Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
});

// @desc    Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) throw new ApiError(404, "User not found");
    res.status(200).json({ success: true, user });
});

// @desc    Update user (Admin)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    const updatedUser = await user.save();
    res.status(200).json({ success: true, user: updatedUser });
});

// @desc    Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User removed" });
});


// @desc    Add new shipping address to user profile
// @route   POST /api/users/address
// @access  Private
const addUserAddress = asyncHandler(async (req, res) => {
    const { name, phone, pincode, address, city, state } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        const newAddress = {
            name,
            phone,
            pincode,
            address,
            city,
            state,
            isDefault: user.addresses.length === 0 // Pehla address hamesha default hoga
        };

        user.addresses.push(newAddress);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            addresses: user.addresses
        });
    } else {
        throw new ApiError(404, "User not found");
    }
});

// @desc    Delete user address
// @route   DELETE /api/users/address/:id
 const deleteAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        // Filter karke us ID wala address hata dein
        user.addresses = user.addresses.filter(
            (addr) => addr._id.toString() !== req.params.id
        );
        await user.save();
        res.json({ success: true, addresses: user.addresses });
    } else {
        throw new ApiError(404, "User not found");
    }
});

// @desc    Update user address
// @route   PUT /api/users/address/:id
 const updateAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const addrIndex = user.addresses.findIndex(
            (addr) => addr._id.toString() === req.params.id
        );
        if (addrIndex !== -1) {
            user.addresses[addrIndex] = { ...user.addresses[addrIndex], ...req.body };
            await user.save();
            res.json({ success: true, addresses: user.addresses });
        }
    } else {
        throw new ApiError(404, "User not found");
    }
});


const updateProfilePic = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        if (!req.file) {
            throw new ApiError(400, "Please upload an image");
        }

        user.profilePic = req.file.path; 
        const updatedUser = await user.save();

        // ✅ Professional Response: Saare fields bhejein taaki UI sync rahe
        res.json({ 
            success: true, 
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isAdmin: updatedUser.isAdmin,
                profilePic: updatedUser.profilePic,
                addresses: updatedUser.addresses,
            }
        });
    } else {
        throw new ApiError(404, "User not found");
    }
});
// ✅ Sare functions ko export list mein check karein
export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,    
    updateUser,     
    deleteUser,
    googleAuth,
    logout,
    addUserAddress,
    deleteAddress,
    updateAddress,
    updateProfilePic
    

    
    
};