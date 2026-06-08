import { useEffect, useState } from "react";

import NutritionForm from "../components/NutritionForm";
import ActivityForm from "../components/ActivityForm";
import LogList from "../components/LogList";

import { database } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function LogPage() {
    const [logs, setLogs] = useState([]);

    const foodLogs = logs.filter((log) => {
      return log.type === "food";
    });

    const activityLogs = logs.filter((log) => {
      return log.type === "activity";
    });

    const totalCaloriesConsumed = foodLogs.reduce(
      (total, log) => {
        return total + Number(log.calories);
      },
      0
    );

    const totalCaloriesBurned = activityLogs.reduce(
      (total, log) => {
        return total + Number(log.calories);
      },
      0
    );

const netCalories =
  totalCaloriesConsumed - totalCaloriesBurned;
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

      <section className="card">
        <h2>Daily Summary</h2>

        <p>
          Calories Consumed:
          {totalCaloriesConsumed}
          </p>

        <p>
          Calories Burned:
          {totalCaloriesBurned}
        </p>

        <p>
          Net Calories:
          {netCalories}
        </p>
      </section>
      <LogList logs={logs} />

    </main>
  );
}

export default LogPage;