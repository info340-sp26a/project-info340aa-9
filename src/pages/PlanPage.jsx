export default function PlanPage() {
  return (
    <main>
      <section className="welcome-banner">
        <div>
          <div className="welcome-badge-row">
            <span className="status-chip">Muscle Gain</span>
            <span className="status-chip status-chip-soft">
              Moderate Activity
            </span>
          </div>

          <h1>Your Personalized Fitness Plan</h1>
          <p>
            Based on your current goal and activity level, here’s a workout plan
            to guide your progress today.
          </p>
        </div>

        <div className="card accent-panel hero-summary">
          <span className="panel-label">Today’s Focus</span>
          <h2>Upper Body Strength</h2>
          <p>
            This plan emphasizes upper body training with enough recovery to
            support steady muscle growth.
          </p>
        </div>
      </section>
    </main>
  );
}