const express = require("express");
const auth = require("../middleware/authMiddleware");
const { monthlyData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/monthly", auth, monthlyData);

module.exports = router;
