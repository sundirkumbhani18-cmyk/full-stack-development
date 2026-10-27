import { createSlice, nanoid } from "@reduxjs/toolkit";

const starterTransactions = [
  { id: "t1", title: "Monthly salary", category: "Salary", date: "2026-10-01", amount: 50000, type: "income", icon: "briefcase" },
  { id: "t2", title: "Grocery shopping", category: "Food", date: "2026-10-02", amount: 1850, type: "expense", icon: "basket" },
  { id: "t3", title: "Electricity bill", category: "Bills", date: "2026-10-04", amount: 2450, type: "expense", icon: "house" },
  { id: "t4", title: "Freelance project", category: "Freelance", date: "2026-10-07", amount: 12000, type: "income", icon: "briefcase" },
  { id: "t5", title: "Fuel", category: "Transport", date: "2026-10-09", amount: 1200, type: "expense", icon: "car-front" },
  { id: "t6", title: "Dinner with friends", category: "Food", date: "2026-10-12", amount: 950, type: "expense", icon: "cup-hot" },
  { id: "t7", title: "Online shopping", category: "Shopping", date: "2026-10-15", amount: 3200, type: "expense", icon: "bag" },
  { id: "t8", title: "Health checkup", category: "Health", date: "2026-10-18", amount: 800, type: "expense", icon: "heart-pulse" },
];

function loadTransactions() {
  try {
    const saved = localStorage.getItem("expense-tracker-redux-transactions");
    return saved ? JSON.parse(saved) : starterTransactions;
  } catch {
    return starterTransactions;
  }
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: { items: loadTransactions() },
  reducers: {
    addTransaction: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(transaction) {
        return { payload: { ...transaction, id: nanoid() } };
      },
    },
    updateTransaction(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTransaction(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    replaceTransactions(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, replaceTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;