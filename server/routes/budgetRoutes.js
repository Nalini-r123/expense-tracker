const express=require("express");
const auth=require("../middleware/authMiddleware");
const { getBudgetStatus, setBudget }=require("../controllers/budgetController");

const router=express.Router();

router.get("/status",auth,getBudgetStatus);
router.post("/",auth,setBudget);

module.exports=router;
