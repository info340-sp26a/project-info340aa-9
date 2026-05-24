import { useState } from "react";

import NutritionForm from "../components/NutritionForm";
import ActivityForm from "../components/ActivityForm";
import LogList from "../components/LogList";

function LogPage() {
    const [logs, setLogs] = useState([]);
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
        <NutritionForm />
        <ActivityForm />
      </div>

      <LogList />

    </main>
  );
}

export default LogPage;