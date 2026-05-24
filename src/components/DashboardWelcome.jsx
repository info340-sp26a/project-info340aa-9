function DashboardWelcome() {
  return (
    <section className="welcome-banner">
      <div>
        <div className="welcome-badge-row">
          <span className="status-chip">Muscle Gain</span>
          <span className="status-chip status-chip-soft">5-day streak</span>
        </div>
        <h1>Welcome back, Larissa!</h1>
        <p>
          Your unified health system is updated with today's dietary and
          training insights.
        </p>
        <div className="hero-pill-row">
          <span className="status-pill">
            Daily goal: <strong>75% complete</strong>
          </span>
          <span className="status-pill status-pill-soft">
            Target calories: <strong>2,500 kcal</strong>
          </span>
        </div>
      </div>
      <div className="hero-summary card accent-panel">
        <span className="panel-label">Today's recommendation</span>
        <h2>Protein + strength recovery</h2>
        <p>
          Keep your meals rich in lean protein and pair your next workout with a
          short mobility session.
        </p>
        <div className="mini-metrics">
          <div>
            <span>Protein</span>
            <strong>145g</strong>
          </div>
          <div>
            <span>Hydration</span>
            <strong>2.2L</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardWelcome;
