**Expense Tracker Web Application**

A full-stack web application that allows users to track expenses, set monthly budgets, visualize spending trends, and receive automated email alerts when spending approaches limits.

Built using **Node.js, Express, MySQL, and Chart.js**, this project demonstrates real-world full-stack development concepts including authentication, REST APIs, database integration, and dynamic dashboards.

**Features**

*  User Authentication (Register/Login)
*  JWT Token-based Authorization
*  Add Expenses
*  Delete Expenses
*  Dynamic Expense Trend Graph
*  Budget Progress Bar
*  Automatic Email Alerts
*  Monthly Budget Tracking
*  User-specific Data Isolation
*  Modern Dashboard UI


**Tech Stack**

--Frontend
* HTML
* CSS
* JavaScript
* Chart.js

--Backend
* Node.js
* Express.js

--Database
* MySQL

--Libraries Used
* bcryptjs → password hashing
* jsonwebtoken → authentication
* nodemailer → email alerts
* dotenv → environment variables
* cors → API communication
* mysql2 → database connection


**Installation & Setup**

--Clone Repository

```
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

**Install Dependencies**

```
npm install
```

---

**Create Environment File**

Create a `.env` file in root:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
JWT_SECRET=supersecretkey
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Setup Database**

--Create database:

```
CREATE DATABASE expense_tracker;
```

--Create tables:

```sql
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100) UNIQUE,
password VARCHAR(255)
);

CREATE TABLE expenses (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
category VARCHAR(100),
amount DECIMAL(10,2),
expense_date DATE
);

CREATE TABLE budgets (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
month INT,
year INT,
budget_limit DECIMAL(10,2)
);
```

---

**Run Server**

```
node server/app.js
```

**Server starts at:**

```
http://localhost:5000
```

---

**Open Application**

--Open browser:

```
client/login.html
```

---

**Authentication Flow**

1. User registers
2. Password is hashed using bcrypt
3. Login validates credentials
4. JWT token generated
5. Token stored in browser
6. Token used for protected routes


**Budget Alert Logic**

--Emails are automatically sent when:
80% reached - Warning Alert(yellow color in budget limit on application)
100% exceeded - Limit Exceeded Alert(red color in budget limit on application)


**Chart Functionality**

The dashboard displays a dynamic line chart showing expense trends.
The graph updates automatically whenever:

* a new expense is added
* an expense is deleted


**API Endpoints**

--Authentication

```
POST /api/auth/register
POST /api/auth/login
```

--Expenses

```
GET /api/expenses
POST /api/expenses
DELETE /api/expenses/:id
```

--Budget

```
POST /api/budget
GET /api/budget/status
```

---

**Concepts Demonstrated**

--This project showcases understanding of:

* REST API architecture
* Authentication systems
* Secure password storage
* Database design
* Async operations
* Frontend–Backend communication
* Data visualization
* Event-driven programming


**Future Enhancements**

* Edit expense feature
* Category analytics pie chart
* Dark mode
* Mobile responsiveness
* Cloud deployment
* Export reports

**Note(look into it)**
When your new, we should register first, only then we can login, and the alert messages will be sent to the main that is put in .env file
