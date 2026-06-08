import { Link } from "react-router";
import Card from "react-bootstrap/Card";

function DashboardPlan(props) {
  let recommendation;
  let focus;

  if (props.netCalories > 2000) {
    focus = "Activity Balance";
    recommendation =
      "Consider adding more activity today to balance your calorie intake.";
  } else if (props.netCalories < 1200) {
    focus = "Nutrition Support";
    recommendation =
      "Your net calories are low today. Consider adding a balanced meal or snack.";
  } else {
    focus = "Maintenance";
    recommendation = "You are on track with your daily fitness goal.";
  }
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="fs-4 text-color-main fw-bold" as="h2">
          Plan Preview
        </Card.Title>
        <Card.Text className="mb-3">
          <strong>Focus:</strong> {focus}
        </Card.Text>
        <Card.Text className="mb-3">{recommendation}</Card.Text>
        <Card.Link
          className="text-color-main fw-bold dashboard-plan-link"
          as={Link}
          to="/plan"
        >
          View Full Plan Details &rarr;
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default DashboardPlan;
