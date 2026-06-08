import { useState } from "react";

function ActivityForm({ addLog }) {
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");


  function handleActivityNameChange(event) {
    setActivityName(event.target.value);
  }

  function handleDurationChange(event) {
    setDuration(event.target.value);
  }

  function handleActivityCaloriesChange(event) {
    setCalories(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    addLog({
      type: "activity",
      activityName,
      duration,
      calories
    });

    setActivityName("");
    setDuration("");
    setCalories("");
  }

  return (
    <section className="card">
      <h2>Activity Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activity-name">Activity Name</label>
          <input
            type="text"
            id="activity-name"
            placeholder="e.g., Jogging"
            value={activityName}
            onChange={handleActivityNameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="activity-duration">Duration</label>
          <input
            type="text"
            id="activity-duration"
            placeholder="e.g., 30 minutes"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="activity-calories">Estimated Calories Burned</label>
          <input
            type="number"
            id="activity-calories"
            placeholder="e.g., 250"
            value={calories}
            onChange={handleActivityCaloriesChange}
          />
        </div>

        <button type="submit">Add Activity</button>
      </form>
    </section>
  );
}

export default ActivityForm;
