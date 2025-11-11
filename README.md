# 💸 BudgetMaxxing

**BudgetMaxxing** is a Python-based budgeting app built to help college students take control of their money — no spreadsheets, no guilt trips, just clarity.

Between tuition, food, rent, and social life, it’s easy for students to overspend without realizing it.  
BudgetMaxxing connects securely to your bank accounts **or** lets you upload bank statements manually, then analyzes your transactions to provide insights, alerts, and personalized advice — all in one place.

---

## 🎯 Overview

College students often juggle:
- Multiple accounts and inconsistent income  
- Tuition, rent, subscriptions, and social expenses  
- Little time to track it all  

**BudgetMaxxing solves this by:**
- Automatically importing and categorizing bank data  
- Showing clear spending and income trends  
- Providing AI-generated financial insights  
- Sending alerts when you’re close to overspending  
- Offering flexibility — connect your bank *or* upload statements manually  

💡 *The goal: make budgeting feel modern, simple, and actually helpful.*

---

## ⚙️ Tech Stack

**Backend**
- Python  
- FastAPI (REST API)  
- SQLAlchemy (ORM)  
- PostgreSQL (production) / SQLite (local)

**Integrations**
- Plaid — secure bank linking (live transactions, balances)  
- Veryfi / Mindee — OCR for receipts & PDFs  
- OpenAI / Gemini — natural language financial insights  

**Authentication**
- JWT-based authentication  
- bcrypt password hashing  
- Secure environment variables for tokens  

**Frontend (Planned)**
- React or Next.js dashboard  
- Chart.js or Recharts for visual analytics  

**Deployment**
- Backend: Render / Railway / Fly.io  
- Frontend: Vercel / Netlify  
- Database: PostgreSQL (Supabase / Railway)

---

## 🚀 Features

### ✅ 1. Secure Bank Integration
- Connect your bank with **Plaid** for real-time transactions.  
- View balances, accounts, and categorized spending across all institutions.  
- Read-only access — BudgetMaxxing never touches your money.  

### ✅ 2. Manual Bank Statement Uploads
Not comfortable linking your account? No problem.  
- Upload **CSV, OFX, or PDF** bank statements securely.  
- Automatic parsing and categorization.  
- Custom column mapping for unique formats.  
- Duplicate detection to prevent overlapping data.  

### ✅ 3. Smart Categorization
- Auto-categorizes transactions into:
  - Food, Rent, Subscriptions, Transportation, etc.  
- Learns from your edits over time.  
- Merge or customize categories easily.  

### ✅ 4. Spending Insights
- Monthly summaries for:
  - Total income  
  - Total spending  
  - Net cash flow  
- Trend visualizations:
  - “Your spending on dining increased 22% since last month.”  
  - “You saved more than you spent for the first time this semester!”  

### ✅ 5. AI-Powered Financial Advice
- Uses OpenAI or Gemini to turn raw data into simple, actionable insights:  
  - “You’re on track to overshoot your entertainment budget by $45.”  
  - “Canceling inactive subscriptions could save $130/year.”  
  - “You have consistent income — consider setting a recurring savings goal.”  

### ✅ 6. Overspending Prevention
- Custom category limits and alerts.  
- Notifications when spending spikes unexpectedly.  
- Weekly recaps delivered to your dashboard or inbox.  

### ✅ 7. Goals & Progress
- Create savings goals like “Spring Break Trip — $400.”  
- Visualize progress with projections based on your actual spending.  

---

## 🧩 Project Structure

```bash
budgetmaxxing/
├─ app/
│  ├─ main.py              # FastAPI entrypoint
│  ├─ config.py            # Environment + settings
│  ├─ database.py          # DB engine + session
│  ├─ models.py            # User, Account, Transaction, Goal
│  ├─ schemas.py           # Pydantic schemas
│  ├─ routes/
│  │  ├─ auth.py
│  │  ├─ accounts.py
│  │  ├─ transactions.py
│  │  ├─ uploads.py        # Manual bank statement uploads
│  │  ├─ budgets.py
│  │  ├─ insights.py
│  ├─ services/
│  │  ├─ plaid_service.py
│  │  ├─ parser_service.py # CSV/PDF parsing
│  │  ├─ ai_service.py
│  │  ├─ categorize.py
│  │  ├─ alerts_service.py
│  ├─ utils/
│  │  ├─ logging.py
│  │  ├─ validators.py
│
├─ tests/
│  ├─ test_auth.py
│  ├─ test_uploads.py
│  ├─ test_transactions.py
│
├─ scripts/
│  ├─ seed_demo_data.py
│
├─ .env.example
├─ requirements.txt
├─ README.md
├─ LICENSE
