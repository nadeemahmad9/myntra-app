import { ApiError } from "../utils/ApiError.js";

// @desc    Handle 404 - Not Found Routes
const notFound = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
};

// @desc    Main Error Handler (Standard & Custom Errors)
const errorHandler = (err, req, res, next) => {
    let error = err;

    // Agar error hamari custom ApiError class ka nahi hai (jaise Mongoose error)
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        success: false,
        message: error.message,
        errors: error.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    // Experienced Dev Touch: Production mein status codes aur response format consistent rakhna
    res.status(error.statusCode || 500).json(response);
};

// ✅ Dono ko export karna zaroori hai
export { notFound, errorHandler };