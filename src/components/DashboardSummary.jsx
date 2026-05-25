
function ProgressChart(props) {
  const percentage = props.percentage;

  return (
    <div className="dashboard-progress-ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r="54"
          className="landing-progress-bg"
        ></circle>
        <circle
          cx="60"
          cy="60"
          r="54"
          className="landing-progress-fill"
          style={{ '--percentage': percentage }}
        ></circle>
      </svg>
      <span className="landing-progress-text">{percentage}%</span>
    </div>
  );
}

function DashboardSummary(props) {
  const calorieInfo = props.user.calorieInfo;
  const metricQuery = props.metricQuery.trim().toLowerCase();
  const summaryTitle = props.summaryTitle ?? "Daily Summary";
  const statItems = [
    { label: 'Target', value: `${calorieInfo.target} kcal` },
    { label: 'Intake', value: `${calorieInfo.intake} kcal` },
    { label: 'Burned', value: `${calorieInfo.burned} kcal` },
    { label: 'Remaining', value: `${calorieInfo.remaining} kcal` },
  ];
  const visibleStatItems = metricQuery
    ? statItems.filter((item) => item.label.toLowerCase().includes(metricQuery))
    : statItems;

  return (
    <section className="card dashboard-summary-card">
      <h2 className="dashboard-summary-title">{summaryTitle}</h2>
      <div className="dashboard-summary-chart">
        <ProgressChart percentage={calorieInfo.percentage} />
      </div>
      <div className="dashboard-summary-stats">
        {visibleStatItems.length > 0 ? (
          visibleStatItems.map((item) => (
            <div className="stat-item" key={item.label}>
              <span className="stat-label">{item.label}</span>
              <span className="stat-value">{item.value}</span>
            </div>
          ))
        ) : (
          <p className="stat-empty-state">No matching calorie metric found.</p>
        )}
      </div>
    </section>
  );
}

export default DashboardSummary;
