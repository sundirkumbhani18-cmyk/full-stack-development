export default function TransactionsTable({ transactions, onEdit, onDelete, compact = false }) {
  if (!transactions.length) {
    return <div className="empty-state"><i className="bi bi-receipt-cutoff" /><strong>No transactions found</strong><span>Try changing your search or add a transaction.</span></div>;
  }
  return (
    <div className="table-responsive">
      <table className="table transaction-table align-middle mb-0">
        <thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th className="text-end">AMOUNT</th>{!compact && <th className="text-end">ACTIONS</th>}</tr></thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>
                <div className="transaction-name">
                  <div className={`transaction-icon ${t.type}`}><i className={`bi bi-${t.icon || "cash-coin"}`} /></div>
                  <div><strong>{t.title}</strong><span>{t.type === "income" ? "Money received" : "Money spent"}</span></div>
                </div>
              </td>
              <td><span className="category-pill">{t.category}</span></td>
              <td className="date-cell">{new Date(`${t.date}T12:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
              <td className={`text-end amount-cell ${t.type}`}>{t.type === "income" ? "+" : "−"}₹{Number(t.amount).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
              {!compact && <td className="text-end">
                <button className="table-action" title="Edit" onClick={() => onEdit(t)}><i className="bi bi-pencil" /></button>
                <button className="table-action delete-action" title="Delete" onClick={() => onDelete(t.id)}><i className="bi bi-trash3" /></button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}