function LogCard({ log }) {
  let elem = "";

  if (log.type === "food") {
    elem = (
      <section className="card">
        <h3>{log.foodName}</h3>

        <p>
          Quantity: {log.quantity}
        </p>

        <p>
          {log.calories} calories
        </p>
      </section>
    );
  }
  else {
    elem = (
      <section className="card">
        <h3>{log.activityName}</h3>

        <p>
          Duration: {log.duration}
        </p>

        <p>
          {log.calories} calories burned
        </p>
      </section>
    );
  }

  return elem;
}

export default LogCard;