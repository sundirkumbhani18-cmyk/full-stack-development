export default function StatCard({ title, value, icon, tone, trend, note }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${tone}`}>{icon}</div>
        <button className="stat-more" aria-label={`${title} options`}><i className="bi bi-three-dots" /></button>
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <span className={`trend ${tone === "orange" ? "trend-down" : ""}`}><i className={`bi ${tone === "orange" ? "bi-arrow-down-right" : "bi-arrow-up-right"}`} /> {trend}</span>
        <span className="stat-note">{note}</span>
      </div>
    </article>
  );
}