import LogCard from "./LogCard";

function LogList({ logs }) {
  const logComponents = logs.map((log, index) => {
    const elem = (
    <LogCard
      key={index}
      log={log}
    />
  );

  return elem;
});

  return (
    <section>

      <h2>Activity Log</h2>

      {logComponents}

    </section>
  );
}

export default LogList;