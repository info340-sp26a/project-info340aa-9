function LogList({ logs, title }) {

  const logComponents = logs.map((log) => {

    let elem = "";
    if (log.type === "food") {
      elem = (
        <div key={log.foodName}>
          <h3>{log.foodName}</h3>
          <p>Quantity: {log.quantity}</p>
          <p>{log.calories} calories</p>
        </div>
      );
    } else {
      elem = (
        <div key={log.activityName}>
          <h3>{log.activityName}</h3>
          <p>Duration: {log.duration}</p>
          <p>{log.calories} calories burned</p>
        </div>
      );
    }

    return elem;
  });

  return (
    <section>

      <h2>{title}</h2>

      {logComponents}

    </section>
  );
}

export default LogList;