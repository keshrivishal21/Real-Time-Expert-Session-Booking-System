const Expert = require("../models/Expert");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.getExperts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", category } = req.query;

  const query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;

  const [experts, totalExperts] = await Promise.all([
    Expert.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Expert.countDocuments(query),
  ]);

  res.json({
    experts,
    totalExperts,
    totalPages: Math.ceil(totalExperts / limit),
    currentPage: Number(page),
  });
});

exports.getExpertById = asyncHandler(async (req, res) => {
  const expert = await Expert.findById(req.params.id);
  if (!expert) throw new AppError("Expert not found", 404);
  res.json(expert);
});