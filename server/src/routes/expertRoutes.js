const express = require("express");
const router = express.Router();
const { getExperts, getExpertById } = require("../controllers/expertController");
const { mongoIdParam } = require("../middlewares/validateMiddleware");

router.get("/", getExperts);
router.get("/:id", mongoIdParam, getExpertById);

module.exports = router;