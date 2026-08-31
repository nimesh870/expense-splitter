# 💰 Expense Splitter

> **A modern, full-stack expense splitting app built to polish React skills**

Split expenses among friends, roommates, and travel groups with instant balance calculations and settlement tracking.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Overview

**Expense Splitter** is a full-stack web application that simplifies splitting expenses in groups. Whether you're splitting rent with roommates, sharing trip costs with friends, or managing group budgets, this app handles the math and tracks who owes whom.

**Built as a learning project to master:**
- React + Vite for modern frontend development
- Redux Toolkit for complex state management
- Tailwind CSS + shadcn/ui for beautiful UIs without CSS
- React Router for seamless navigation
- Backend API design and implementation
- Database design and optimization

---

## ✨ Features

### Core MVP
- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Create Groups** - Create groups with multiple members
- ✅ **Add Expenses** - Log expenses with descriptions and amounts
- ✅ **Smart Splitting** - Split expenses equally, custom amounts, or by percentage
- ✅ **Balance Tracking** - Real-time calculation of who owes whom
- ✅ **Settlement Records** - Track payment settlements
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile

### Future Features
- 🚀 Receipt OCR - Scan bills with AI
- 🚀 Payment Integration - Stripe for direct settlements
- 🚀 Email Notifications - Reminders for pending payments
- 🚀 Export History - Download expense reports
- 🚀 Multi-currency Support - International groups
- 🚀 Mobile App - React Native version

---

## 🛠️ Tech Stack

### Frontend
```
Framework:     React 18 + Vite
State:         Redux Toolkit
Routing:       React Router v6
Forms:         React Hook Form
Styling:       Tailwind CSS
Components:    shadcn/ui
API:           Axios
Build:         Vite
```

### Backend (Coming Soon)
```
Runtime:       Node.js
Framework:     Express.js
Database:      MongoDB + Mongoose (or Appwrite)
Auth:          JWT + bcryptjs
Payments:      Stripe API
OCR:           Tesseract.js
Email:         SendGrid
```

### Deployment
```
Frontend:      Vercel
Backend:       Render/Railway
Database:      MongoDB Atlas / Appwrite
Storage:       AWS S3 / Appwrite Storage
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org))
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/expense-splitter.git
cd expense-splitter
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup shadcn/ui** (if not already done)
```bash
npx shadcn-ui@latest init

# When prompted, answer:
# TypeScript: No
# Style: Default
# Base color: Slate
# CSS file: src/index.css
# CSS variables: Yes
```

4. **Add required components**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add table
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
expense-splitter/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Dashboard with groups & stats
│   │   ├── Login.jsx             # User login
│   │   ├── Signup.jsx            # User registration
│   │   ├── GroupDetails.jsx      # Group expenses & balances
│   │   ├── AddExpense.jsx        # Add/edit expense form
│   │   └── History.jsx           # Transaction history
│   │
│   ├── components/
│   │   ├── Header.jsx            # Navigation header
│   │   ├── Sidebar.jsx           # Side navigation
│   │   ├── GroupCard.jsx         # Group card component
│   │   ├── ExpenseForm.jsx       # Expense form
│   │   └── SettlementModal.jsx   # Settlement dialog
│   │
│   ├── features/                 # Redux slices
│   │   ├── authSlice.js          # Authentication state
│   │   ├── groupSlice.js         # Groups state
│   │   ├── expenseSlice.js       # Expenses state
│   │   └── uiSlice.js            # UI state (modals, etc)
│   │
│   ├── services/                 # API calls
│   │   ├── api.js                # Axios instance
│   │   ├── authService.js        # Auth API calls
│   │   ├── groupService.js       # Groups API calls
│   │   └── expenseService.js     # Expenses API calls
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.js            # Auth hook
│   │   ├── useGroup.js           # Group hook
│   │   └── useExpense.js         # Expense hook
│   │
│   ├── utils/
│   │   ├── calculateBalances.js  # Balance calculation logic
│   │   ├── splitExpense.js       # Split expense logic
│   │   └── formatCurrency.js     # Currency formatting
│   │
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
│
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 💻 Usage

### Creating a Group
1. Click "Create Group" button
2. Enter group name and select members
3. Click "Create" to start tracking expenses

### Adding Expenses
1. Open a group
2. Click "Add Expense"
3. Enter amount, description, who paid
4. Choose split type (equal/custom/percentage)
5. Click "Add" to save

### Settling Payments
1. View group balance
2. See who owes whom
3. Click "Settle" button
4. Process payment (future: Stripe integration)

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  password: String (hashed),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Groups Collection
```javascript
{
  _id: ObjectId,
  name: String,
  createdBy: ObjectId (ref: Users),
  members: [ObjectId] (ref: Users),
  createdAt: Date,
  updatedAt: Date
}
```

### Expenses Collection
```javascript
{
  _id: ObjectId,
  groupId: ObjectId (ref: Groups),
  paidBy: ObjectId (ref: Users),
  amount: Decimal,
  description: String,
  splits: [
    {
      userId: ObjectId (ref: Users),
      amount: Decimal
    }
  ],
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Transactions Collection
```javascript
{
  _id: ObjectId,
  groupId: ObjectId (ref: Groups),
  from: ObjectId (ref: Users),
  to: ObjectId (ref: Users),
  amount: Decimal,
  status: String (pending/completed),
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Redux State Structure

```javascript
// Auth State
{
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  },

  // Groups State
  groups: {
    groups: [],
    currentGroup: null,
    loading: false
  },

  // Expenses State
  expenses: {
    expenses: [],
    loading: false
  },

  // UI State
  ui: {
    modals: {
      addExpense: false,
      createGroup: false,
      settlement: false
    }
  }
}
```

---

## 🧮 Core Logic Examples

### Calculate Balances
```javascript
function calculateBalances(expenses) {
  const balances = {}
  
  expenses.forEach(expense => {
    const { paidBy, splits } = expense
    
    splits.forEach(split => {
      if (split.userId !== paidBy) {
        if (!balances[split.userId]) {
          balances[split.userId] = {}
        }
        balances[split.userId][paidBy] = 
          (balances[split.userId][paidBy] || 0) + split.amount
      }
    })
  })
  
  return balances
}
```

### Split Expense
```javascript
function splitExpense(amount, type, splits) {
  if (type === 'equal') {
    const perPerson = amount / splits.length
    return splits.map(person => ({
      userId: person,
      amount: perPerson
    }))
  }
  
  if (type === 'custom') {
    return splits
  }
  
  if (type === 'percentage') {
    return splits.map(person => ({
      userId: person.userId,
      amount: (amount * person.percentage) / 100
    }))
  }
}
```

---

## 📱 API Endpoints (Future Backend)

### Authentication
```
POST   /api/auth/signup          Create account
POST   /api/auth/login           Login
POST   /api/auth/logout          Logout
GET    /api/auth/me              Get current user
```

### Groups
```
POST   /api/groups               Create group
GET    /api/groups               Get user's groups
GET    /api/groups/:id           Get group details
PUT    /api/groups/:id           Update group
DELETE /api/groups/:id           Delete group
POST   /api/groups/:id/members   Add member
DELETE /api/groups/:id/members   Remove member
```

### Expenses
```
POST   /api/expenses             Create expense
GET    /api/groups/:id/expenses  Get group expenses
PUT    /api/expenses/:id         Update expense
DELETE /api/expenses/:id         Delete expense
```

### Balances & Settlements
```
GET    /api/groups/:id/balances  Get who owes who
POST   /api/settlements          Settle payment
GET    /api/settlements/:id      Get settlement details
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Signup with valid email
- [ ] Login with correct credentials
- [ ] Create group with members
- [ ] Add expense with equal split
- [ ] Add expense with custom split
- [ ] View group balances
- [ ] Calculate correct balances
- [ ] Mark settlement as complete
- [ ] Delete expense recalculates balance
- [ ] Responsive on mobile

### Run Tests (Future)
```bash
npm run test
npm run test:coverage
```

---

---

## 🎓 What I'm Learning

**Frontend Skills:**
- Advanced React patterns (hooks, context, performance)
- State management with Redux Toolkit
- Component composition and reusability
- Form handling and validation
- Responsive design with Tailwind
- Using pre-built component libraries (shadcn/ui)

**Backend Skills (Coming Soon):**
- REST API design
- Database modeling
- Authentication & authorization
- Error handling
- API testing

**DevOps Skills:**
- Version control (Git/GitHub)
- Deployment (Vercel, Render)
- Environment management
- Production debugging

---

## 🤝 Contributing

Since this is a learning project, contributions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Inspired by **Splitwise**
- UI components from **shadcn/ui**
- Styling with **Tailwind CSS**
- Built with **Vite** for fast development
- State management with **Redux Toolkit**

---

## 📧 Contact & Support

**Questions or feedback?**
- Open an issue on GitHub
- Email: nimeshdulal870@gmail.com

**Status:** Building in public 👀

---

**Last Updated:** August 31, 2026  
**Version:** 0.1.0 (Pre-release)
