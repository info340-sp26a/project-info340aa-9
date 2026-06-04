import LogCard from "./LogCard";

function LogList({ logs, title }) {
  const logCards = logs.map((log) => {
    let logKey = "";
    if (log.type === "food") {
      logKey = log.foodName;
    }
    else {
      logKey = log.activityName;
    }
    return (
      <LogCard
        key={logKey}
        log={log}
      />
    );
  });

  return (
    <section>
      <h2>{title}</h2>
      {logCards}
    </section>
  );
}

export default LogList;