const db = require("../config/db");



/* GET CURRENT BUDGET STATUS */
exports.getBudgetStatus = async (req,res)=>{

const userId=req.user.id;
const now=new Date();

const month=now.getMonth()+1;
const year=now.getFullYear();

const [budget]=await db.query(
"SELECT budget_limit FROM budgets WHERE user_id=? AND month=? AND year=?",
[userId,month,year]
);

const [total]=await db.query(
"SELECT SUM(amount) as total FROM expenses WHERE user_id=? AND MONTH(expense_date)=? AND YEAR(expense_date)=?",
[userId,month,year]
);

res.json({
limit: budget[0]?.budget_limit || 0,
spent: total[0].total || 0
});
};



/* SET OR UPDATE BUDGET */
exports.setBudget = async (req,res)=>{

const { month, year, budget_limit } = req.body;
const userId = req.user.id;


// check if budget already exists
const [existing] = await db.query(
"SELECT id FROM budgets WHERE user_id=? AND month=? AND year=?",
[userId, month, year]
);


// if exists → update
if(existing.length > 0){

await db.query(
"UPDATE budgets SET budget_limit=? WHERE user_id=? AND month=? AND year=?",
[budget_limit, userId, month, year]
);

}
else{

// if not → insert
await db.query(
"INSERT INTO budgets (user_id, month, year, budget_limit) VALUES (?, ?, ?, ?)",
[userId, month, year, budget_limit]
);

}

res.json({ message:"Budget saved" });
};
