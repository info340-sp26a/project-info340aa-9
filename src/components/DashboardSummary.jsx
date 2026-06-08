import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProgressChart({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const p = Math.min(Math.max(percentage, 0), 200);

  const lap1Offset = 2 * circumference - (p / 100) * circumference;
  const lap2Offset = 3 * circumference - (p / 100) * circumference;
  const tipRotation = (p / 100) * 360;

  const transitionStyle = { transition: "all 1s ease-in-out" };

  return (
    <div
      className="position-relative d-inline-flex align-items-center justify-content-center"
      style={{ width: "160px", height: "160px" }}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-100 h-100"
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <filter id="tip-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.5"
              floodOpacity="0.5"
              floodColor="#000"
            />
          </filter>
        </defs>

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e9ecef"
          strokeWidth="12"
        />

        <circle
          className="progress-bar-stroke"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={2 * circumference}
          strokeDashoffset={lap1Offset}
          style={transitionStyle}
        />

        <circle
          className="progress-bar-stroke"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={2 * circumference}
          strokeDashoffset={lap2Offset}
          style={transitionStyle}
        />

        <g
          style={{
            transform: `rotate(${tipRotation}deg)`,
            transformOrigin: "60px 60px",
            ...transitionStyle,
          }}
        >
          <circle
            className="progress-bar-fill"
            cx="114"
            cy="60"
            r="6"
            filter="url(#tip-shadow)"
          />
        </g>
      </svg>

      <span className="position-absolute fs-3 fw-bold text-color-main">
        {percentage}%
      </span>
    </div>
  );
}

function DashboardSummary(props) {
  const calorieInfo = props.user.calorieInfo;
  const metricQuery = props.metricQuery.trim().toLowerCase();
  const summaryTitle = props.summaryTitle ?? "Daily Summary";

  const statItems = [
    { label: "Target", value: `${calorieInfo.target} kcal` },
    { label: "Intake", value: `${calorieInfo.intake} kcal` },
    { label: "Burned", value: `${calorieInfo.burned} kcal` },
    { label: "Remaining", value: `${calorieInfo.remaining} kcal` },
  ];

  const visibleStatItems = metricQuery
    ? statItems.filter((item) => {
        item.label.toLowerCase().includes(metricQuery);
      })
    : statItems;

  const statContent =
    visibleStatItems.length > 0 ? (
      visibleStatItems.map((item) => (
        <Col key={item.label} className="stat-item">
          <Card.Text className="mb-0">
            <span className="text-color-muted d-block text-uppercase small">
              {item.label}
            </span>
            <strong className="text-color-accent d-block mt-1 fs-3 fw-bold">
              {item.value}
            </strong>
          </Card.Text>
        </Col>
      ))
    ) : (
      <p className="text-color-muted m-0">No matching calorie metric found.</p>
    );

  return (
    <Card className="mb-4 pe-md-4">
      <Card.Body>
        <Card.Title
          as="h2"
          className="text-center m-0 mb-4 fw-bold fs-4 text-color-main"
        >
          {summaryTitle}
        </Card.Title>

        <Row className="align-items-center gy-4 gx-md-5">
          <Col xs={12} md="auto" className="d-flex justify-content-center">
            <ProgressChart percentage={calorieInfo.percentage} />
          </Col>
          <Col xs={12} md>
            <Row xs={1} md={2} className="g-3 g-md-4 align-content-center">
              {statContent}
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default DashboardSummary;
