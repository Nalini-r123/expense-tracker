const express = require("express");
const auth = require("../middleware/authMiddleware");
const { addExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");

const router = express.Router();

router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);
router.delete("/:id", auth, deleteExpense);

module.exports = router;
