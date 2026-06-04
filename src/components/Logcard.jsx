function LogCard({ log }) {

  let elem = "";

  if (log.type === "food") {
    elem = (
      <div>
        <h3>{log.foodName}</h3>
        <p>Quantity: {log.quantity}</p>
        <p>{log.calories} calories</p>
      </div>
    );
  } else {
    elem = (
      <div>
        <h3>{log.activityName}</h3>
        <p>Duration: {log.duration}</p>
        <p>{log.calories} calories burned</p>
      </div>
    );
  }

  return elem;
}

export default LogCard;