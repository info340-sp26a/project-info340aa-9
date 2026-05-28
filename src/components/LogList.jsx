function LogList({ logs }) {

  const logComponents = logs.map((log) => {

    const elem = (
      <div key={log.foodName}>

        <h3>{log.foodName}</h3>

        <p>{log.quantity}</p>

        <p>{log.calories} calories</p>

      </div>
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