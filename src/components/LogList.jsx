import LogCard from "./LogCard";

function LogList({ logs, title, onDeleteLog }) {
  const logCards = logs.map((log) => {
    return (
      <LogCard
        key={log.key}
        log={log}
        onDeleteLog={onDeleteLog}
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