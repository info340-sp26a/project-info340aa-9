function LogList({ logs }) {
  return (
    <section className="card log-section">
      <h2>Recent Logs</h2>

      {logs.length === 0 ? (
        <p>No logs yet. Add a meal or activity to start tracking your progress.</p>
      ) : (
        logs.map((log, index) => (
          <div className="card" key={index}>
            {log.type === "food" ? (
              <>
                <h3>{log.foodName}</h3>
                <p>Quantity: {log.quantity}</p>
                <p>{log.calories} calories</p>
              </>
            ) : (
              <>
                <h3>{log.activityName}</h3>
                <p>Duration: {log.duration}</p>
                <p>{log.calories} calories burned</p>
              </>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default LogList;