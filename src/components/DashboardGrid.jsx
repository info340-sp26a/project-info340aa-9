function DashboardGrid() {
  return (
    <div className="dashboard-grid">
      <section className="card chart-view">
        <h2>Daily Achievement</h2>
        <figure>
          <img
            src="img/progress-chart.svg"
            alt="Doughnut chart showing 75% goal completion for the day"
          />
          <figcaption>
            Daily progress based on your Muscle Gain goal.
          </figcaption>
        </figure>
      </section>

      <section className="card calorie-box">
        <h2>Calorie Overview</h2>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Intake</span>
            <span className="stat-value">2,100 kcal</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Burned</span>
            <span className="stat-value">600 kcal</span>
          </div>
        </div>
      </section>

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
        <a href="plan.html" className="cta-link">
          View Full Plan Details &rarr;
        </a>
      </section>
    </div>
  );
}

export default DashboardGrid;
