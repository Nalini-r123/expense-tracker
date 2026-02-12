const db = require("../config/db");

exports.monthlyData = async (req,res)=>{

const [rows] = await db.query(`
SELECT WEEK(expense_date) as week,
SUM(amount) as total
FROM expenses
WHERE user_id = ?
GROUP BY WEEK(expense_date)
`,[req.user.id]);

res.json(rows);
}
