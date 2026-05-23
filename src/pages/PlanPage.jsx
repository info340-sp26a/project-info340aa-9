import { useState } from "react";

const workouts = [
  {
    title: "Warm-Up",
    description:
      "Start with 5–10 minutes of light jogging and dynamic stretching to prepare your body for training.",
  },
  {
    title: "Main Workout",
    description:
      "Spend 30 minutes on upper body strength exercises to support your muscle gain goal.",
  },
  {
    title: "Cardio / Recovery",
    description:
      "Finish with 15 minutes of cycling or brisk walking to stay active without overtraining.",
  },
  {
    title: "Notes",
    description:
      "Remember to stay hydrated and give your muscles enough time to recover after training.",
  },
];

function WorkoutCard(props) {
  return (
    <div
      className={`card workout-card ${props.isCompleted ? "completed-task" : ""}`}
      style={{
        borderLeft: props.isCompleted
          ? "5px solid #4CAF50"
          : "5px solid transparent",
        transition: "all 0.3s ease",
        opacity: props.isCompleted ? 0.7 : 1,
      }}
    >
      <h3>{props.workout.title}</h3>
      <p
        style={{
          textDecoration: props.isCompleted ? "line-through" : "none",
        }}
      >
        {props.workout.description}
      </p>

      <button
        onClick={() => props.onToggleComplete(props.workout.title)}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          backgroundColor: props.isCompleted ? "#e0e0e0" : "#007FFF",
          color: props.isCompleted ? "#666" : "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {props.isCompleted ? "✓ Completed" : "Mark as Done"}
      </button>
    </div>
  );
}

export default function PlanPage() {
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  const toggleComplete = (title) => {
    setCompletedWorkouts((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <main>
      <section className="welcome-banner">
        <div>
          <div className="welcome-badge-row">
            <span className="status-chip">Muscle Gain</span>
            <span className="status-chip status-chip-soft">
              Moderate Activity
            </span>
          </div>

          <h1>Your Personalized Fitness Plan</h1>
          <p>
            Based on your current goal and activity level, here's a workout plan
            to guide your progress today.
          </p>
        </div>

        <div className="card accent-panel hero-summary">
          <span className="panel-label">Today's Focus</span>
          <h2>Upper Body Strength</h2>
          <p>
            This plan emphasizes upper body training with enough recovery to
            support steady muscle growth.
          </p>
        </div>
      </section>

      <div className="plan-grid">
        <section className="card">
          <h2>Goal Summary</h2>
          <div className="goal-details">
            <p>
              <strong>Primary Goal:</strong> Muscle Gain
            </p>
            <p>
              <strong>Activity Level:</strong> Moderate
            </p>
            <p>
              <strong>Calories Burned:</strong> 320 kcal
            </p>
          </div>
        </section>

        <section className="card">
          <h2>Activity Target</h2>
          <div className="target-details">
            <p>
              <strong>Daily Goal:</strong> 45 minutes
            </p>
            <p>
              <strong>Weekly Target:</strong> 4 workout sessions
            </p>
            <p>
              <strong>Focus Area:</strong> Upper Body Strength
            </p>
          </div>
        </section>
      </div>

      <section>
        <h2>Today&apos;s Workout Plan</h2>

        <div className="plan-card-grid">
          {workouts.map((workout) => {
            const isCompleted = !!completedWorkouts[workout.title];

            return (
              <WorkoutCard
                key={workout.title}
                workout={workout}
                isCompleted={isCompleted}
                onToggleComplete={toggleComplete}
              />
            );
          })}
        </div>
      </section>

      <section className="card accent-panel guidance-note">
        <h2>Why This Plan Fits You</h2>
        <p>
          This plan is designed to help you build muscle through focused
          strength training while keeping your overall activity balanced for the
          day.
        </p>
      </section>
    </main>
  );
}
