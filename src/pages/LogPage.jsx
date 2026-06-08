import { useEffect, useState } from "react";

import NutritionForm from "../components/NutritionForm";
import ActivityForm from "../components/ActivityForm";
import LogList from "../components/LogList";

import { database } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function LogPage() {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
      const logsRef = ref(database, "logs");
      onValue(logsRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const logArray = Object.values(data);
          setLogs(logArray);
        }
      });
    }, []);
    function addLog(newLog) {
      const logsRef = ref(database, "logs");
      push(logsRef, newLog);
      setLogs((currentLogs) => {
        return [...currentLogs, newLog];
      });
    }
  return (
    <main>

      <section className="page-intro">
        <h1>Activity Log</h1>

        <p>
          Record your meals and workouts in one place to understand how your
          daily habits support your fitness goal.
        </p>
      </section>

      <div className="logger-layout">
        <NutritionForm addLog={addLog} />
        <ActivityForm addLog={addLog} />
      </div>

      <LogList logs={logs} />

    </main>
  );
}

export default LogPage;