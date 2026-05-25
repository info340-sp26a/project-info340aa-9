function DashboardFilter(props) {
<<<<<<< HEAD
  const dateOptions = props.dateOptions;

=======
>>>>>>> e53424b427adc3cacdf7fbf08199cdf4d50f8431
  return (
    <section className="dashboard-controls card">
      <h2>Filter Your Progress</h2>
      <form className="filter-form" onSubmit={(event) => event.preventDefault()}>
        <div className="form-group">
          <label htmlFor="date-range">View Period:</label>
          <select
            id="date-range"
            name="period"
            value={props.period}
            onChange={(event) => props.onPeriodChange(event.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date-select">Select Date:</label>
<<<<<<< HEAD
          <select
            id="date-select"
            name="date"
            value={props.selectedDate}
            onChange={(event) => props.onDateChange(event.target.value)}
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
=======
          <input
            type="date"
            id="date-select"
            name="date"
            value={props.selectedDate}
            min={props.dateMin}
            max={props.dateMax}
            onChange={(event) => props.onDateChange(event.target.value)}
          />
>>>>>>> e53424b427adc3cacdf7fbf08199cdf4d50f8431
        </div>

        <div className="form-group">
          <label htmlFor="metric-search">Search Metric:</label>
          <input
            type="text"
            id="metric-search"
            name="q"
            value={props.metricQuery}
            onChange={(event) => props.onMetricQueryChange(event.target.value)}
            placeholder="e.g., Protein, Cardio"
          />
        </div>
      </form>
    </section>
  );
}

export default DashboardFilter;
