import React, { useState } from "react";

function DashboardFilter() {
  const [period, setPeriod] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
】
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    console.log("Filter applied:", { period, searchQuery });
  };

  return (
    <section className="dashboard-controls card">
      <h2>Filter Your Progress</h2>
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="form-group">
          <label htmlFor="date-range">View Period:</label>
          <select 
            id="date-range" 
            name="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="metric-search">Search Metric:</label>
          <input
            type="text"
            id="metric-search"
            name="q"
            placeholder="e.g., Protein, Cardio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit">Update View</button>
      </form>
    </section>
  );
}

export default DashboardFilter;
