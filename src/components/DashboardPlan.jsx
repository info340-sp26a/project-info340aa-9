import { Link } from "react-router";
import Card from "react-bootstrap/Card";

function DashboardPlan() {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="fs-4 text-color-main fw-bold" as="h2">
          Plan Preview
        </Card.Title>
        <Card.Text className="mb-3">
          <strong>Focus:</strong> Resistance Training
        </Card.Text>
        <Card.Text className="mb-3">
          Current analysis suggests increasing protein intake by 15% today.
        </Card.Text>
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
