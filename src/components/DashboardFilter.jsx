import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

function DashboardFilter(props) {
  return (
    <Card className="dashboard-controls mb-4">
      <Card.Body>
        <Card.Title className="fs-4 text-color-main fw-bold" as="h2">
          Filter Your Progress
        </Card.Title>
        <DashboardForm
          period={props.period}
          onPeriodChange={props.onPeriodChange}
          selectedDate={props.selectedDate}
          onDateChange={props.onDateChange}
          dateMin={props.dateMin}
          dateMax={props.dateMax}
          metricQuery={props.metricQuery}
          onMetricQueryChange={props.onMetricQueryChange}
        />
      </Card.Body>
    </Card>
  );
}

function DashboardForm(props) {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Form.Group className="d-grid mb-3" controlId="date-range">
        <Form.Label className="text-color-main fs-6 fw-medium">
          View Period:
        </Form.Label>
        <DashboardFormDropdown
          period={props.period}
          onPeriodChange={props.onPeriodChange}
          selectedDate={props.selectedDate}
          onDateChange={props.onDateChange}
          dateMin={props.dateMin}
          dateMax={props.dateMax}
          metricQuery={props.metricQuery}
          onMetricQueryChange={props.onMetricQueryChange}
        />
      </Form.Group>

      <Form.Group
        className="text-color-main d-grid mb-3"
        controlId="date-select"
      >
        <Form.Label className="fs-6 fw-medium">Select Date:</Form.Label>
        <Form.Control
          className="dashboard-form-control background-color-surface-soft"
          type="date"
          name="date"
          value={props.selectedDate}
          min={props.dateMin}
          max={props.dateMax}
          onChange={(event) => {
            props.onDateChange(event.target.value);
          }}
        />
      </Form.Group>

      <Form.Group
        className="text-color-main d-grid mb-3"
        controlId="metric-search"
      >
        <Form.Label className="fs-6 fw-medium">Search Metric:</Form.Label>
        <Form.Control
          className="dashboard-form-control background-color-surface-soft"
          type="text"
          name="q"
          value={props.metricQuery}
          onChange={(event) => {
            props.onMetricQueryChange(event.target.value);
          }}
          placeholder="e.g., Protein, Cardio"
        />
      </Form.Group>
    </Form>
  );
}

function DashboardFormDropdown(props) {
  const periodLabels = {
    today: "Today",
    week: "Past Week",
    month: "Past Month",
    year: "Past Year",
  };

  return (
    <Dropdown
      onSelect={(eventKey) => {
        props.onPeriodChange(eventKey);
      }}
    >
      <Dropdown.Toggle
        id="dropdown-period"
        className="dashboard-form-control w-100 text-start background-color-surface-soft text-color-main"
        style={{ appearance: "none" }}
      >
        {periodLabels[props.period] || "Select Period"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dashboard-form-control w-100 p-2 background-color-surface-soft text-color-main">
        <Dropdown.Item eventKey="today" className="rounded mb-1">
          Today
        </Dropdown.Item>
        <Dropdown.Item eventKey="week" className="rounded mb-1">
          Past Week
        </Dropdown.Item>
        <Dropdown.Item eventKey="month" className="rounded mb-1">
          Past Month
        </Dropdown.Item>
        <Dropdown.Item eventKey="year" className="rounded">
          Past Year
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DashboardFilter;
