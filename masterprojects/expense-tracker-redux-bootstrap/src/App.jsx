import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, updateTransaction, deleteTransaction } from "./features/transactions/transactionsSlice";
import StatCard from "./components/StatCard";
import TransactionsTable from "./components/TransactionsTable";
import TransactionModal from "./components/TransactionModal";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const monthlyData = [
  { month: "May", income: 42000, expense: 28000 },
  { month: "Jun", income: 46000, expense: 31000 },
  { month: "Jul", income: 39000, expense: 26000 },
  { month: "Aug", income: 52000, expense: 33000 },
  { month: "Sep", income: 48000, expense: 30000 },
  { month: "Oct", income: 62000, expense: 10500 },
];
const categoryColors = ["#4678f5", "#24b8a6", "#f6b84a", "#9b76ed", "#e2e8f0"];
const initialCategories = [
  { name: "Food & Dining", amount: 2800, budget: 5000, icon: "basket", color: "blue" },
  { name: "Shopping", amount: 3200, budget: 6000, icon: "bag", color: "purple" },
  { name: "Bills & Utilities", amount: 2450, budget: 4000, icon: "house", color: "orange" },
  { name: "Transport", amount: 1200, budget: 2500, icon: "car-front", color: "green" },
];

export default function App() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const [section, setSection] = useState("Dashboard");
  const [role, setRole] = useState("User");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const totals = useMemo(() => transactions.reduce((acc, t) => {
    if (t.type === "income") acc.income += Number(t.amount);
    else acc.expense += Number(t.amount);
    return acc;
  }, { income: 0, expense: 0 }), [transactions]);
  const balance = totals.income - totals.expense;
  const filtered = useMemo(() => transactions.filter((t) => {
    const matches = `${t.title} ${t.category} ${t.date}`.toLowerCase().includes(query.toLowerCase());
    return matches && (filter === "all" || t.type === filter);
  }).sort((a, b) => b.date.localeCompare(a.date)), [transactions, query, filter]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const startAdd = () => { setEditing(null); setShowModal(true); };
  const startEdit = (item) => { setEditing(item); setShowModal(true); };
  const submitTransaction = (item) => {
    if (editing) dispatch(updateTransaction(item));
    else dispatch(addTransaction(item));
    setShowModal(false);
    setEditing(null);
    showNotice(editing ? "Transaction updated successfully." : "Transaction added successfully.");
  };
  const removeTransaction = (id) => {
    if (window.confirm("Delete this transaction?")) {
      dispatch(deleteTransaction(id));
      showNotice("Transaction deleted.");
    }
  };
  const exportCsv = () => {
    const rows = [["Title", "Category", "Date", "Type", "Amount"], ...filtered.map((t) => [t.title, t.category, t.date, t.type, t.amount])];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = "expense-transactions.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const userNav = [
    ["Dashboard", "grid-1x2"], ["Transactions", "arrow-left-right"], ["Categories", "tags"],
    ["Budgets", "bullseye"], ["Reports", "bar-chart-line"], ["Profile", "person-circle"]
  ];
  const adminNav = [
    ["Dashboard", "grid-1x2"], ["Users", "people"], ["Categories", "tags"],
    ["All Transactions", "arrow-left-right"], ["Reports", "bar-chart-line"], ["Settings", "gear"]
  ];
  const nav = role === "Admin" ? adminNav : userNav;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><i className="bi bi-wallet2" /></div>
          <div className="brand-copy"><div className="brand-name">Expense<span>Track</span></div><div className="brand-caption">PERSONAL FINANCE</div></div>
          <button className="mobile-close d-lg-none" onClick={() => setMobileOpen(false)} aria-label="Close menu"><i className="bi bi-x-lg" /></button>
        </div>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav">
          {nav.map(([label, icon]) => <button key={label} className={`nav-item ${section === label ? "active" : ""}`} onClick={() => { setSection(label); setMobileOpen(false); }}>
            <i className={`bi bi-${icon}`} /><span>{label}</span>{label === "Transactions" && <small>{transactions.length}</small>}
          </button>)}
        </nav>
        <div className="sidebar-spacer" />
        <div className="insight-card">
          <div className="insight-symbol"><i className="bi bi-stars" /></div>
          <strong>Make your money work</strong>
          <p>Build better habits, one day at a time.</p>
          <button onClick={() => setSection("Reports")}>View insights <i className="bi bi-arrow-right" /></button>
        </div>
        <button className="nav-item sidebar-logout" onClick={() => showNotice("Demo frontend: no account is connected.")}><i className="bi bi-box-arrow-left" /><span>Log out</span></button>
        <div className="sidebar-user"><div className="user-avatar">RS</div><div className="user-copy"><strong>{role === "Admin" ? "Admin User" : "Rahul Sharma"}</strong><span>{role === "Admin" ? "Administrator" : "Personal account"}</span></div><i className="bi bi-three-dots" /></div>
      </aside>

      {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-button d-lg-none" onClick={() => setMobileOpen(true)} aria-label="Open menu"><i className="bi bi-list" /></button>
            <div className="breadcrumb-text">Workspace <i className="bi bi-chevron-right" /> <strong>{section}</strong></div>
          </div>
          <div className="topbar-right">
            <label className="role-picker"><span>View as</span><select value={role} onChange={(e) => { setRole(e.target.value); setSection("Dashboard"); }} aria-label="Choose demo panel"><option>User</option><option>Admin</option></select><i className="bi bi-chevron-down" /></label>
            <button className="notification-button" aria-label="Notifications" onClick={() => showNotice("You're all caught up!")}><i className="bi bi-bell" /><span /></button>
            <div className="top-avatar">RS</div>
          </div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><span /> YOUR FINANCIAL OVERVIEW</div>
              <h1>{section === "Dashboard" ? "Good morning, Rahul" : section}<span className="wave">{section === "Dashboard" ? " 👋" : ""}</span></h1>
              <p className="page-subtitle">{section === "Dashboard" ? "Here's what's happening with your money today." : `Manage and review your ${section.toLowerCase()} in one place.`}</p>
            </div>
            <div className="welcome-actions">
              <button className="btn btn-export" onClick={exportCsv}><i className="bi bi-download" /> Export</button>
              <button className="btn btn-primary-action" onClick={startAdd}><i className="bi bi-plus-lg" /> Add transaction</button>
            </div>
          </div>

          {notice && <div className="toast-notice"><i className="bi bi-check-circle-fill" />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><i className="bi bi-x" /></button></div>}

          {section === "Dashboard" && <>
            <section className="stats-grid">
              <StatCard title="Total balance" value={money(balance)} icon="wallet2" tone="blue" trend="+12.8%" note="vs. last month" />
              <StatCard title="Total income" value={money(totals.income)} icon="trending-up" tone="green" trend="+8.2%" note="vs. last month" />
              <StatCard title="Total expenses" value={money(totals.expense)} icon="trending-down" tone="orange" trend="-4.6%" note="vs. last month" />
              <StatCard title="Savings rate" value={`${totals.income ? Math.max(0, Math.round(balance / totals.income * 100)) : 0}%`} icon="piggy-bank" tone="purple" trend="+5.4%" note="vs. last month" />
            </section>
            <section className="charts-grid">
              <article className="panel chart-panel">
                <div className="panel-heading"><div><h2>Income vs. expenses</h2><p>Track your cash flow over time</p></div><select className="period-select" aria-label="Chart period"><option>Last 6 months</option><option>This year</option></select></div>
                <div className="chart-legend"><span><i className="legend-dot income-dot" />Income</span><span><i className="legend-dot expense-dot" />Expenses</span></div>
                <div className="area-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlyData} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3974f6" stopOpacity={0.16}/><stop offset="100%" stopColor="#3974f6" stopOpacity={0}/></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#25b8a6" stopOpacity={0.14}/><stop offset="100%" stopColor="#25b8a6" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid stroke="#edf1f7" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8995a8", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8995a8", fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v) => money(v)} contentStyle={{ border: "1px solid #e7ebf2", borderRadius: 12, boxShadow: "0 8px 30px #15294a12" }} />
                  <Area type="monotone" dataKey="income" stroke="#3974f6" strokeWidth={2.5} fill="url(#incomeFill)" />
                  <Area type="monotone" dataKey="expense" stroke="#25b8a6" strokeWidth={2.5} fill="url(#expenseFill)" />
                </AreaChart></ResponsiveContainer></div>
              </article>
              <article className="panel category-panel">
                <div className="panel-heading"><div><h2>Spending breakdown</h2><p>Where your money goes</p></div><button className="more-button" aria-label="More options"><i className="bi bi-three-dots" /></button></div>
                <div className="donut-wrap">
                  <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryColors.map((color, i) => ({ name: ["Food", "Shopping", "Bills", "Transport", "Other"][i], value: [32, 24, 18, 14, 12][i], color }))} dataKey="value" nameKey="name" innerRadius={65} outerRadius={86} paddingAngle={3} stroke="none">{categoryColors.map((color) => <Cell key={color} fill={color} />)}</Pie><Tooltip formatter={(v) => `${v}%`} /></PieChart></ResponsiveContainer>
                  <div className="donut-center"><strong>{money(totals.expense)}</strong><span>Total spent</span></div>
                </div>
                <div className="category-legend">{["Food", "Shopping", "Bills", "Transport", "Other"].map((name, i) => <div key={name}><span><i style={{ background: categoryColors[i] }} />{name}</span><strong>{[32, 24, 18, 14, 12][i]}%</strong></div>)}</div>
              </article>
            </section>
            <section className="panel transactions-panel">
              <div className="panel-heading transactions-heading"><div><h2>Recent transactions</h2><p>Your latest income and expenses</p></div><button className="text-link" onClick={() => setSection("Transactions")}>View all <i className="bi bi-arrow-right" /></button></div>
              <TransactionsTable transactions={filtered.slice(0, 5)} onEdit={startEdit} onDelete={removeTransaction} compact />
            </section>
            <section className="bottom-grid">
              <article className="panel budget-panel">
                <div className="panel-heading"><div><h2>Monthly budget</h2><p>Keep your spending on track</p></div><button className="text-link" onClick={() => setSection("Budgets")}>View budgets <i className="bi bi-arrow-right" /></button></div>
                <div className="budget-total"><div><span>Total spent</span><strong>{money(9650)} <small>/ {money(17500)}</small></strong></div><span className="budget-percent">55% used</span></div>
                <div className="progress budget-progress"><div className="progress-bar" style={{ width: "55%" }} /></div>
                <div className="budget-note"><i className="bi bi-check-circle-fill" /> You're doing well! You're within your monthly budget.</div>
              </article>
              <article className="panel savings-panel">
                <div className="savings-art"><i className="bi bi-piggy-bank" /></div><div className="savings-copy"><span>YOUR SAVINGS GOAL</span><h3>Save for something great</h3><p>Every little bit adds up. Keep building your financial future.</p><button onClick={() => setSection("Budgets")}>Set a goal <i className="bi bi-arrow-right" /></button></div>
              </article>
            </section>
          </>}

          {section === "Transactions" || section === "All Transactions" ? <section className="panel full-table-panel">
            <div className="panel-heading transactions-heading"><div><h2>{section === "All Transactions" ? "All transactions" : "Transaction history"}</h2><p>Review, search, and manage your money</p></div><button className="btn btn-primary-action" onClick={startAdd}><i className="bi bi-plus-lg" /> Add transaction</button></div>
            <div className="table-tools"><div className="search-box"><i className="bi bi-search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transactions..." /></div><select className="form-select type-filter" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter transaction type"><option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option></select><button className="btn btn-export" onClick={exportCsv}><i className="bi bi-download" /> Export CSV</button></div>
            <TransactionsTable transactions={filtered} onEdit={startEdit} onDelete={removeTransaction} />
            <div className="table-footer">Showing <strong>{filtered.length}</strong> transaction{filtered.length === 1 ? "" : "s"}</div>
          </section> : null}

          {section === "Categories" && <section className="panel page-panel"><div className="panel-heading"><div><h2>Expense categories</h2><p>Explore your spending by category</p></div><div className="search-box category-search"><i className="bi bi-search" /><input value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} placeholder="Find category..." /></div></div><div className="category-cards">{initialCategories.filter((c) => c.name.toLowerCase().includes(categorySearch.toLowerCase())).map((c) => <div className="category-card" key={c.name}><div className={`category-card-icon ${c.color}`}><i className={`bi bi-${c.icon}`} /></div><h3>{c.name}</h3><p>Spent this month</p><strong>{money(c.amount)}</strong><div className="progress"><div className={`progress-bar ${c.color}`} style={{ width: `${Math.min(100, c.amount / c.budget * 100)}%` }} /></div><small>{money(c.budget - c.amount)} remaining</small></div>)}</div></section>}

          {section === "Budgets" && <section className="panel page-panel"><div className="panel-heading"><div><h2>Your monthly budgets</h2><p>Stay aware of spending limits</p></div><span className="budget-month"><i className="bi bi-calendar3" /> October 2026</span></div><div className="budget-summary"><div><span>Budget total</span><strong>{money(17500)}</strong></div><div><span>Amount spent</span><strong>{money(9650)}</strong></div><div><span>Remaining</span><strong className="green-text">{money(7850)}</strong></div></div><div className="budget-list">{initialCategories.map((c) => <div className="budget-list-item" key={c.name}><div className={`category-card-icon ${c.color}`}><i className={`bi bi-${c.icon}`} /></div><div className="budget-list-main"><div className="budget-list-title"><strong>{c.name}</strong><span>{money(c.amount)} <em>/ {money(c.budget)}</em></span></div><div className="progress"><div className={`progress-bar ${c.color}`} style={{ width: `${Math.min(100, c.amount / c.budget * 100)}%` }} /></div></div><span className="budget-list-percent">{Math.round(c.amount / c.budget * 100)}%</span></div>)}</div></section>}

          {section === "Reports" && <section className="report-grid"><article className="panel report-panel"><div className="panel-heading"><div><h2>Income & expenses report</h2><p>Monthly cash flow comparison</p></div></div><div className="report-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyData}><CartesianGrid stroke="#edf1f7" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}k`}/><Tooltip formatter={(v) => money(v)}/><Bar dataKey="income" fill="#4678f5" radius={[5,5,0,0]}/><Bar dataKey="expense" fill="#24b8a6" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></article><article className="panel report-summary"><h2>Summary</h2><div><span>Total income</span><strong className="green-text">{money(totals.income)}</strong></div><div><span>Total expenses</span><strong className="orange-text">{money(totals.expense)}</strong></div><div><span>Net balance</span><strong>{money(balance)}</strong></div><button className="btn btn-export w-100 mt-3" onClick={exportCsv}><i className="bi bi-download" /> Download transaction CSV</button></article></section>}

          {section === "Users" && <section className="panel page-panel"><div className="panel-heading"><div><h2>User management</h2><p>Demo admin view — sample users only</p></div></div><div className="admin-user-row"><div className="user-avatar">RS</div><div><strong>Rahul Sharma</strong><span>rahul@example.com</span></div><span className="status-pill">Active</span><span className="role-badge">User</span></div><div className="admin-user-row"><div className="user-avatar admin-avatar">AD</div><div><strong>Admin User</strong><span>admin@example.com</span></div><span className="status-pill">Active</span><span className="role-badge">Admin</span></div><p className="demo-warning"><i className="bi bi-info-circle" /> This is a frontend demonstration. User accounts are not stored on a server.</p></section>}

          {section === "Profile" && <section className="panel page-panel profile-panel"><div className="profile-hero"><div className="profile-large-avatar">RS</div><div><h2>Rahul Sharma</h2><p>Personal account · Joined October 2026</p></div></div><div className="profile-fields"><label>Full name<input className="form-control" defaultValue="Rahul Sharma" /></label><label>Email address<input className="form-control" defaultValue="rahul@example.com" type="email" /></label><label>Currency<select className="form-select" defaultValue="INR"><option value="INR">Indian Rupee (₹ INR)</option><option value="USD">US Dollar ($ USD)</option></select></label></div><button className="btn btn-primary-action mt-4" onClick={() => showNotice("Profile form is a demo and is not connected to a backend.")}>Save profile</button></section>}

          {section === "Settings" && <section className="panel page-panel"><div className="panel-heading"><div><h2>Settings</h2><p>Configure your demo workspace</p></div></div><div className="setting-row"><div><strong>Currency display</strong><span>Display amounts using Indian Rupees</span></div><span className="role-badge">INR ₹</span></div><div className="setting-row"><div><strong>Local data storage</strong><span>Transactions are saved in this browser using Redux and localStorage.</span></div><span className="status-pill">Enabled</span></div><div className="setting-row"><div><strong>Application mode</strong><span>Frontend-only demo; no login or backend connection.</span></div><span className="role-badge">Demo</span></div></section>}

          <footer className="app-footer"><span>© 2026 ExpenseTrack. Built for better money habits.</span><div><span><i className="status-dot" /> All changes saved locally</span><span>Privacy</span><span>Help center</span></div></footer>
        </div>
      </main>
      <TransactionModal show={showModal} onClose={() => { setShowModal(false); setEditing(null); }} onSubmit={submitTransaction} transaction={editing} />
    </div>
  );
}

