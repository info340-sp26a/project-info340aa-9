import { Link } from 'react-router';

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
  const statItems = [
    { label: 'Target', value: `${calorieInfo.target} kcal` },
    { label: 'Intake', value: `${calorieInfo.intake} kcal` },
    { label: 'Burned', value: `${calorieInfo.burned} kcal` },
    { label: 'Remaining', value: `${calorieInfo.remaining} kcal` },
  ];

  return (
    <section className="card dashboard-summary-card">
      <h2 className="dashboard-summary-title">Daily Summary</h2>
      <div className="dashboard-summary-chart">
        <ProgressChart percentage={calorieInfo.percentage} />
      </div>
      <div className="dashboard-summary-stats">
        {statItems.map((item) => (
          <div className="stat-item" key={item.label}>
            <span className="stat-label">{item.label}</span>
            <span className="stat-value">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlanPreview() {
  return (
    <section className="card plan-preview">
        <h2>Plan Preview</h2>
        <div className="preview-content">
          <p>
            <strong>Focus:</strong> Resistance Training
          </p>
          <p>
            Current analysis suggests increasing protein intake by 15% today.
          </p>
          </div>
        <Link to="/plan" className="cta-link">View Full Plan Details &rarr;</Link>
      </section>
  );
}
function DashboardGrid(props) {
  return (
    <div className="dashboard-grid">
      <DashboardSummary user={props.user} />
      <PlanPreview />
    </div>
  );
}

export default DashboardGrid;
