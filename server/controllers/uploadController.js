// const path = require("path")
// const fs = require("fs")
// const asyncHandler = require("express-async-handler")
// const multer = require("multer")

// // Configure storage
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     const uploadDir = "uploads/"

//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true })
//     }

//     cb(null, uploadDir)
//   },
//   filename(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//   },
// })

// // Check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png|webp/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb("Images only!")
//   }
// }

// // Initialize upload
// const upload = multer({
//   storage,
//   limits: { fileSize: 5000000 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb)
//   },
// })

// // @desc    Upload single image
// // @route   POST /api/upload
// // @access  Private
// const uploadImage = asyncHandler(async (req, res) => {
//   const uploadSingle = upload.single("image")

//   uploadSingle(req, res, (err) => {
//     if (err) {
//       res.status(400)
//       throw new Error(err)
//     }

//     res.json({
//       message: "Image uploaded successfully",
//       image: `/${req.file.path}`,
//     })
//   })
// })

// // @desc    Upload multiple images
// // @route   POST /api/upload/multiple
// // @access  Private
// const uploadMultipleImages = asyncHandler(async (req, res) => {
//   const uploadMultiple = upload.array("images", 5) // Max 5 images

//   uploadMultiple(req, res, (err) => {
//     if (err) {
//       res.status(400)
//       throw new Error(err)
//     }

//     const imagePaths = req.files.map((file) => `/${file.path}`)

//     res.json({
//       message: "Images uploaded successfully",
//       images: imagePaths,
//     })
//   })
// })

// module.exports = {
//   uploadImage,
//   uploadMultipleImages,
// }
