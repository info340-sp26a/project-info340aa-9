import { Link } from "react-router";

function DashboardPlan() {
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
export default DashboardPlan;