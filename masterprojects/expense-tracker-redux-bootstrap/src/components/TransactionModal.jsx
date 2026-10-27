import { useEffect, useState } from "react";

const categories = ["Food", "Salary", "Freelance", "Bills", "Transport", "Shopping", "Health", "Entertainment", "Other"];

export default function TransactionModal({ show, onClose, onSubmit, transaction }) {
  const [form, setForm] = useState(emptyForm());

  function emptyForm() {
    return { title: "", category: "Food", date: new Date().toISOString().slice(0, 10), amount: "", type: "expense" };
  }

  useEffect(() => {
    if (transaction) {
      setForm({ title: transaction.title, category: transaction.category, date: transaction.date, amount: String(transaction.amount), type: transaction.type });
    } else {
      setForm(emptyForm());
    }
  }, [transaction, show]);

  if (!show) return null;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.title.trim() || !Number.isFinite(amount) || amount <= 0) return;
    onSubmit({
      ...(transaction ? { id: transaction.id } : {}),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      amount,
      type: form.type,
      icon: iconFor(form.category),
    });
  };

  return (
    <div className="modal-backdrop-custom" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title">
        <div className="modal-heading">
          <div>
            <span className="eyebrow">YOUR FINANCES</span>
            <h2 id="transaction-modal-title">{transaction ? "Edit transaction" : "Add transaction"}</h2>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close" />
        </div>
        <form onSubmit={submit}>
          <label className="form-label">Transaction type</label>
          <div className="type-switch mb-3">
            <button type="button" className={form.type === "expense" ? "selected expense" : ""} onClick={() => setForm({ ...form, type: "expense" })}>
              <i className="bi bi-arrow-up-right-circle me-2" />Expense
            </button>
            <button type="button" className={form.type === "income" ? "selected income" : ""} onClick={() => setForm({ ...form, type: "income" })}>
              <i className="bi bi-arrow-down-left-circle me-2" />Income
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="transaction-title">Title</label>
            <input id="transaction-title" className="form-control" name="title" value={form.title} onChange={change} placeholder="e.g. Grocery shopping" required maxLength="80" />
          </div>
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="transaction-category">Category</label>
              <select id="transaction-category" className="form-select" name="category" value={form.category} onChange={change}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label" htmlFor="transaction-date">Date</label>
              <input id="transaction-date" className="form-control" type="date" name="date" value={form.date} onChange={change} required />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="transaction-amount">Amount (₹)</label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input id="transaction-amount" className="form-control" type="number" min="1" step="0.01" name="amount" value={form.amount} onChange={change} placeholder="0.00" required />
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-light px-4" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary px-4"><i className="bi bi-check2 me-2" />{transaction ? "Save changes" : "Add transaction"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function iconFor(category) {
  const map = { Food: "basket", Salary: "briefcase", Freelance: "briefcase", Bills: "house", Transport: "car-front", Shopping: "bag", Health: "heart-pulse", Entertainment: "ticket-perforated" };
  return map[category] || "cash-coin";
}