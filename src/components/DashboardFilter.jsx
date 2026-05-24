function DashboardFilter() {
  return (
    <section className="dashboard-controls card">
      <h2>Filter Your Progress</h2>
      <form action="#" method="get" className="filter-form">
        <div className="form-group">
          <label for="date-range">View Period:</label>
          <select id="date-range" name="period">
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
        <div className="form-group">
          <label for="metric-search">Search Metric:</label>
          <input
            type="text"
            id="metric-search"
            name="q"
            placeholder="e.g., Protein, Cardio"
          />
        </div>
        <button type="submit">Update View</button>
      </form>
    </section>
  );
}

export default DashboardFilter;
