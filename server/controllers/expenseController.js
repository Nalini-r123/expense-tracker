const db = require("../config/db");
const { sendAlert } = require("../services/emailService");

/* ADD EXPENSE */
exports.addExpense = async (req, res) => {
  const { category, amount, note, expense_date } = req.body;
  const userId = req.user.id;

  await db.query(
    "INSERT INTO expenses (user_id, category, amount, note, expense_date) VALUES (?, ?, ?, ?, ?)",
    [userId, category, amount, note, expense_date]
  );

  const month = new Date(expense_date).getMonth() + 1;
  const year = new Date(expense_date).getFullYear();

  const [totalRows] = await db.query(
    "SELECT SUM(amount) as total FROM expenses WHERE user_id=? AND MONTH(expense_date)=? AND YEAR(expense_date)=?",
    [userId, month, year]
  );

  const total = totalRows[0].total || 0;

  const [budgetRows] = await db.query(
    "SELECT budget_limit FROM budgets WHERE user_id=? AND month=? AND year=?",
    [userId, month, year]
  );

  if (budgetRows.length > 0) {
    const limit = budgetRows[0].budget_limit;

    if (total >= 0.8 * limit) {
      await sendAlert(
        process.env.EMAIL,
        "Budget Warning ⚠",
        "You have crossed 80% of your monthly budget."
      );
    }

    if (total >= limit) {
      await sendAlert(
        process.env.EMAIL,
        "Budget Exceeded ❌",
        "You have exceeded your monthly budget."
      );
    }
  }

  res.json({ message: "Expense added" });
};


/* GET ALL EXPENSES (NEW FUNCTION) */
exports.getExpenses = async (req,res)=>{
  const [rows] = await db.query(
    "SELECT * FROM expenses WHERE user_id=? ORDER BY expense_date DESC",
    [req.user.id]
  );
  res.json(rows);
};

exports.deleteExpense = async (req,res)=>{
const id = req.params.id;

await db.query("DELETE FROM expenses WHERE id=?", [id]);

res.json({ message:"Deleted successfully" });
};
