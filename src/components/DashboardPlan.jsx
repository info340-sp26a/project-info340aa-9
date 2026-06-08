import { Link } from "react-router";
import Card from "react-bootstrap/Card";

function DashboardPlan({ netCalories }) {
  let recommendation = "";
  let focus = "";

  if (netCalories > 2000) {
    focus = "Activity Balance";
    recommendation = "Consider adding more activity today to balance your calorie intake.";
  }
  else if (netCalories < 1200) {
    focus = "Nutrition Support";
    recommendation = "Your net calories are low today. Consider adding a balanced meal or snack.";
  }
  else {
    focus = "Maintenance";
    recommendation = "You are on track with your daily fitness goal.";
  }
  return (
  <Card className="mb-4">
    <Card.Body>
      <h2>Plan Preview</h2>
      <p>
        Recommendation: {recommendation}
      </p>
      <Link to="/plan">
        View Full Plan Details
      </Link>
    </Card.Body>
  </Card>
);
}

export default DashboardPlan;