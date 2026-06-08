import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

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

const planOptions = {
  muscleGain: {
    goalName: "Muscle Gain",
    activityLevel: "Moderate Activity",
    activityLevelShort: "Moderate",
    focus: "Upper Body Strength",
    focusDescription:
      "This plan emphasizes upper body training with enough recovery to support steady muscle growth.",
    caloriesBurned: "320 kcal",
    dailyGoal: "45 minutes",
    weeklyTarget: "4 workout sessions",
    focusArea: "Upper Body Strength",
    guidance:
      "This plan is designed to help you build muscle through focused strength training while keeping your overall activity balanced for the day.",
    nutritionTip:
      "Prioritize protein-rich meals today to support muscle repair after strength training.",
    recoveryTip:
      "Give your upper body enough rest between intense sessions so your muscles can rebuild.",
    progressTip:
      "Track completed strength workouts this week and aim for steady consistency instead of rushing progress.",
    workouts: workouts,
  },

  weightManagement: {
    goalName: "Weight Management",
    activityLevel: "Moderate Activity",
    activityLevelShort: "Moderate",
    focus: "Cardio and Core",
    focusDescription:
      "This plan balances steady cardio with simple strength exercises to support healthy calorie control.",
    caloriesBurned: "380 kcal",
    dailyGoal: "50 minutes",
    weeklyTarget: "5 workout sessions",
    focusArea: "Cardio and Core",
    guidance:
      "This plan supports weight management by combining movement, consistency, and recovery instead of relying on extreme workouts.",
    nutritionTip:
      "Choose balanced meals with vegetables, lean protein, and steady portions to support calorie control.",
    recoveryTip:
      "Use lighter movement or stretching after cardio sessions so your routine stays sustainable.",
    progressTip:
      "Focus on weekly consistency and compare your activity patterns over time instead of judging one day.",
    workouts: [
      {
        title: "Warm-Up",
        description:
          "Start with light walking and stretching so your body is ready for a longer workout.",
      },
      {
        title: "Cardio Training",
        description:
          "Choose a steady activity such as jogging, cycling, or brisk walking for about 25 minutes.",
      },
      {
        title: "Core Strength",
        description:
          "Add simple core exercises like planks or bodyweight movements to support balance and control.",
      },
      {
        title: "Cool Down",
        description:
          "Finish with slow stretching and take a few minutes to let your heart rate come down.",
      },
    ],
  },

  healthyLiving: {
    goalName: "Healthy Living",
    activityLevel: "Light Activity",
    activityLevelShort: "Light",
    focus: "Daily Movement",
    focusDescription:
      "This plan focuses on building a consistent routine through light exercise, stretching, and recovery.",
    caloriesBurned: "180 kcal",
    dailyGoal: "30 minutes",
    weeklyTarget: "4 light activity sessions",
    focusArea: "Mobility and Balance",
    guidance:
      "This plan is designed to help you maintain a balanced routine that supports everyday health and long-term consistency.",
    nutritionTip:
      "Keep meals simple and balanced so your routine feels realistic for everyday life.",
    recoveryTip:
      "Include gentle stretching, hydration, and rest to make healthy movement feel sustainable.",
    progressTip:
      "Notice small wins, such as walking more often or completing light sessions consistently.",
    workouts: [
      {
        title: "Gentle Warm-Up",
        description:
          "Begin with light stretching or a short walk to ease into the routine.",
      },
      {
        title: "Daily Movement",
        description:
          "Spend time walking, doing yoga, or completing a light home workout that feels manageable.",
      },
      {
        title: "Mobility Practice",
        description:
          "Add stretching or balance exercises to support flexibility and everyday movement.",
      },
      {
        title: "Recovery Check",
        description:
          "End by focusing on hydration, rest, and how your body feels after the activity.",
      },
    ],
  },
};

function WorkoutCard(props) {
  let cardClassName = "card workout-card";
  let descriptionClassName = "workout-description";
  let buttonClassName = "workout-toggle-button";

  if (props.isCompleted) {
    cardClassName += " completed-workout-card";
    descriptionClassName += " completed-workout-description";
    buttonClassName += " completed-workout-button";
  }

  return (
    <div className={cardClassName}>
      <h3>{props.workout.title}</h3>

      <p className={descriptionClassName}>
        {props.workout.description}
      </p>

      <button
        type="button"
        className={buttonClassName}
        onClick={() => props.onToggleComplete(props.workout.title)}
      >
        {props.isCompleted ? "✓ Completed" : "Mark as Done"}
      </button>
    </div>
  );
}

export default function PlanPage() {
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [selectedGoal, setSelectedGoal] = useState("muscleGain");
  const [logs, setLogs] = useState([]);

  const currentPlan = planOptions[selectedGoal];

  useEffect(function() {
    const logsRef = ref(database, "logs");

    onValue(logsRef, function(snapshot) {
      const data = snapshot.val();

      if (data) {
        const logArray = Object.values(data);
        setLogs(logArray);
      } else {
        setLogs([]);
      }
    });
  }, []);

  function toggleComplete(title) {
    setCompletedWorkouts(function(prev) {
      return {
        ...prev,
        [title]: !prev[title],
      };
    });
  }

  function handleGoalChange(goalKey) {
    setSelectedGoal(goalKey);
  }

  function getGoalButtonClassName(goalKey) {
    let buttonClassName = "goal-button";

    if (selectedGoal === goalKey) {
      buttonClassName += " selected-goal-button";
    }

    return buttonClassName;
  }

  const foodLogs = logs.filter(function(log) {
    return log.type === "food";
  });

  const activityLogs = logs.filter(function(log) {
    return log.type === "activity";
  });

  const totalCaloriesConsumed = foodLogs.reduce(function(total, log) {
    return total + Number(log.calories);
  }, 0);

  const totalCaloriesBurned = activityLogs.reduce(function(total, log) {
    return total + Number(log.calories);
  }, 0);

  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;
  let nutritionTip = "";
  let recoveryTip = "";
  let progressTip = "";

  if (netCalories > 2000) {
    nutritionTip =
    "Consider adding more activity today to balance your calorie intake.";

    recoveryTip =
    "Include light movement to help maintain energy balance.";

    progressTip =
    "Track calorie intake carefully and monitor portion sizes.";
  }
  else if (netCalories < 1200) {
    nutritionTip =
    "Consider adding a balanced meal or healthy snack today.";

    recoveryTip =
    "Make sure you are eating enough to support recovery.";

    progressTip =
    "Focus on meeting your nutrition goals consistently.";
  }
  else {
    nutritionTip =
    "You are on track with your daily calorie goal.";

    recoveryTip =
    "Maintain your current balance of activity and recovery.";

    progressTip =
    "Keep following your routine and monitor your progress.";
  }

  const workoutCards = currentPlan.workouts.map(function(workout) {
    const isCompleted = !!completedWorkouts[workout.title];

    return (
      <WorkoutCard
        key={workout.title}
        workout={workout}
        isCompleted={isCompleted}
        onToggleComplete={toggleComplete}
      />
    );
  });

  return (
    <main>
      <section className="welcome-banner">
        <div>
          <div className="welcome-badge-row">
            <span className="status-chip">{currentPlan.goalName}</span>
            <span className="status-chip status-chip-soft">
              {currentPlan.activityLevel}
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
          <h2>{currentPlan.focus}</h2>
          <p>{currentPlan.focusDescription}</p>
        </div>
      </section>

      <section className="card">
        <h2>Choose Your Goal</h2>

        <div className="goal-button-row">
          <button
            type="button"
            className={getGoalButtonClassName("muscleGain")}
            aria-pressed={selectedGoal === "muscleGain"}
            onClick={() => handleGoalChange("muscleGain")}
          >
            Muscle Gain
          </button>

          <button
            type="button"
            className={getGoalButtonClassName("weightManagement")}
            aria-pressed={selectedGoal === "weightManagement"}
            onClick={() => handleGoalChange("weightManagement")}
          >
            Weight Management
          </button>

          <button
            type="button"
            className={getGoalButtonClassName("healthyLiving")}
            aria-pressed={selectedGoal === "healthyLiving"}
            onClick={() => handleGoalChange("healthyLiving")}
          >
            Healthy Living
          </button>
        </div>
      </section>

      <div className="plan-grid">
        <section className="card">
          <h2>Goal Summary</h2>
          <div className="goal-details">
            <p>
              <strong>Primary Goal:</strong> {currentPlan.goalName}
            </p>
            <p>
              <strong>Activity Level:</strong> {currentPlan.activityLevelShort}
            </p>
            <p>
              <strong>Calories Burned:</strong> {currentPlan.caloriesBurned}
            </p>
          </div>
        </section>

        <section className="card">
          <h2>Activity Target</h2>
          <div className="target-details">
            <p>
              <strong>Daily Goal:</strong> {currentPlan.dailyGoal}
            </p>
            <p>
              <strong>Weekly Target:</strong> {currentPlan.weeklyTarget}
            </p>
            <p>
              <strong>Focus Area:</strong> {currentPlan.focusArea}
            </p>
          </div>
        </section>
      </div>

      <section>
        <h2>Today&apos;s Workout Plan</h2>

        <div className="plan-card-grid">
          {workoutCards}
        </div>
      </section>

      <section className="card log-insight-panel">
        <h2>Logged Data Insight</h2>
        <p>
          These totals come from the nutrition and activity records saved in
          your activity log.
        </p>

        <div className="log-insight-grid">
          <div className="log-insight-item">
            <span>Food calories logged</span>
            <strong>{totalCaloriesConsumed} kcal</strong>
          </div>

          <div className="log-insight-item">
            <span>Activity calories logged</span>
            <strong>{totalCaloriesBurned} kcal</strong>
          </div>

          <div className="log-insight-item">
            <span>Net calories</span>
            <strong>{netCalories} kcal</strong>
          </div>
        </div>
      </section>

      <section className="card recommendation-panel">
        <h2>Goal-Based Recommendations</h2>
        <p>
          These suggestions update when you choose a different fitness goal.
        </p>

        <div className="recommendation-grid">
          <article className="recommendation-item">
            <h3>Nutrition Support</h3>
            <p>{nutritionTip}</p>
          </article>

          <article className="recommendation-item">
            <h3>Recovery Reminder</h3>
            <p>{recoveryTip}</p>
          </article>

          <article className="recommendation-item">
            <h3>Progress Tip</h3>
            <p>{progressTip}</p>
          </article>
        </div>
      </section>

      <section className="card accent-panel guidance-note">
        <h2>Why This Plan Fits You</h2>
        <p>{currentPlan.guidance}</p>
      </section>
    </main>
  );
}