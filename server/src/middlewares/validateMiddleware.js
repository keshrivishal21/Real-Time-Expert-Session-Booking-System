const { body, param, query, validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (validations) => [
  ...validations,
  (req, _res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((e) => e.msg);
      throw new AppError(messages.join(". "), 400);
    }
    next();
  },
];


const bookingValidation = validate([
  body("expertId").notEmpty().withMessage("Expert ID is required"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("A valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("date").trim().notEmpty().withMessage("Date is required"),
  body("timeSlot").trim().notEmpty().withMessage("Time slot is required"),
]);

const statusValidation = validate([
  param("id").isMongoId().withMessage("Invalid booking ID"),
  body("status")
    .isIn(["Pending", "Confirmed", "Completed"])
    .withMessage("Status must be Pending, Confirmed, or Completed"),
]);

const emailQueryValidation = validate([
  query("email").isEmail().withMessage("A valid email query param is required"),
]);

const mongoIdParam = validate([
  param("id").isMongoId().withMessage("Invalid ID format"),
]);

module.exports = {
  validate,
  bookingValidation,
  statusValidation,
  emailQueryValidation,
  mongoIdParam,
};