const AppError = require("../utils/AppError");

const errorHandler = (err, _req, res, _next) => {
  // for double booking error
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "Duplicate entry — this resource already exists";
  }

  if (err.name === "ValidationError") {
    err.statusCode = 400;
    const messages = Object.values(err.errors).map((e) => e.message);
    err.message = messages.join(". ");
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "Invalid ID format";
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal server error";

  if (!err.isOperational) {
    console.error("[ERROR]", err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = { errorHandler, notFound };
