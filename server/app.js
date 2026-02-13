require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* SERVE FRONTEND (IMPORTANT FOR DEPLOYMENT) */
app.use(express.static(path.join(__dirname, "../client")));

/* OPEN LOGIN PAGE BY DEFAULT */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

/* PORT FIX FOR RENDER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
