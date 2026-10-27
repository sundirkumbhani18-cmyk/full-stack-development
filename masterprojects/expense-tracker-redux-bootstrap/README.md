# Expense Tracker — React + Redux Toolkit + Bootstrap

A frontend-only expense tracker dashboard inspired by the supplied reference screenshot.

## Features
- Responsive dashboard with summary cards and charts
- User and Admin demo navigation modes
- Add, edit, delete, search, and filter transactions
- Income/expense totals and savings rate calculated from Redux state
- Export filtered transactions to CSV
- Redux Toolkit store and slice
- Transactions persist in browser `localStorage`
- Categories, budgets, reports, profile, and settings demo screens

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
├── app/
│   └── store.js
├── components/
│   ├── StatCard.jsx
│   ├── TransactionModal.jsx
│   └── TransactionsTable.jsx
├── features/
│   └── transactions/
│       └── transactionsSlice.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Notes
This is a frontend prototype. Admin/User switching is for preview only and is not authentication or authorization. User management, profile saving, and settings are illustrative. There is no backend or server-side database. Do not use it to store sensitive financial information.