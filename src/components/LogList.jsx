function LogList({ logs }) {

  return (
    <section>
      <h2>Activity Log</h2>

      {logs.map((log, index) => (
        <div key={index}>
          <h3>{log.foodName}</h3>
          <p>{log.quantity}</p>
          <p>{log.calories} calories</p>
        </div>
      ))}
    </section>
  );
}

export default LogList;