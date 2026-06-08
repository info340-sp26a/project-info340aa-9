import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function DashboardInnerCard() {
  return (
    <Card>
      <Card.Title className="dashboard-accent-card-title text-color-rose fw-bold text-uppercase mb-3">
        Today's recommendation
      </Card.Title>
      <Card.Title className="text-color-main fw-bold mb-3 fs-6">
        Protein + strength recovery
      </Card.Title>
      <Card.Text className="text-color-muted mb-3">
        Keep your meals rich in lean protein and pair your next workout with a
        short mobility session.
      </Card.Text>
      <Badge
        className="d-flex justify-content-between p-3 mb-3 background-color-accent-softer"
        style={{ borderRadius: "18px" }}
      >
        <span className="text-color-muted fw-normal fs-6">Protein</span>
        <strong className="text-color-main fw-bold fs-6">145g</strong>
      </Badge>
      <Badge
        className="d-flex justify-content-between p-3 mb-3 background-color-accent-softer"
        style={{ borderRadius: "18px" }}
      >
        <span className="text-color-muted fw-normal fs-6">Hydration</span>
        <strong className="text-color-main fw-bold fs-6">2.2L</strong>
      </Badge>
    </Card>
  );
}

function DashboardWelcome(props) {
  return (
    <section className="welcome-banner">
      <div>
        <div className="mb-3">
          <Badge
            pill
            className="dashboard-badge border-color-accent-rose-soft py-3 px-4 me-3 background-color-rose-soft text-color-main text-uppercase"
          >
            Muscle Gain
          </Badge>

          <Badge
            pill
            className="dashboard-badge border-color-accent-softer py-3 px-4 me-3 background-color-accent-softer text-color-main text-uppercase"
          >
            5-day streak
          </Badge>
        </div>
        <h1 className="text-color-main">Welcome back, {props.user.name}!</h1>
        <p className="mb-3 text-color-muted">
          Your unified health system is updated with today's dietary and
          training insights.
        </p>
        <div>
          <Badge
            pill
            className="dashboard-badge border-color-accent-rose-soft background-color-accent-soft py-3 px-4 me-3 text-color-main text-uppercase"
          >
            <span>Daily goal: </span>
            <strong>{props.user.calorieInfo.percentage}% complete</strong>
          </Badge>

          <Badge
            pill
            className="dashboard-badge border-color-accent-softer background-color-rose-soft py-3 px-4 me-3 text-color-main text-uppercase"
          >
            <span>Target calories: </span>
            <strong>{props.user.calorieInfo.target} kcal</strong>
          </Badge>
        </div>
      </div>
      <DashboardInnerCard />
    </section>
  );
}

export default DashboardWelcome;
