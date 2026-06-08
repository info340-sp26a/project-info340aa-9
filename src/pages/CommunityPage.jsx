import React, { useState } from 'react';
import ChatSection from '../components/ChatSection';

const squadNames = {
  muscleGain: "Muscle Gain Squad",
  weightManagement: "Weight Management Squad",
  healthyLiving: "Healthy Living Squad",
};

export default function CommunityPage({ messages, setMessages, selectedGoal, logs }) {
  const [chatInput, setChatInput] = useState("");

  const squadName = squadNames[selectedGoal];

  function handleSendMessage(event) {
    event.preventDefault();
    
    if (chatInput !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        text: chatInput,
        type: "sent"
      };

      setMessages(newMsg);
      setChatInput(""); 
    }
  }

  function handleShareButtonClick(logType) {
    let sharedText = "";
 
    if (logType === "Today's Nutrition") {
      const foodLogs = logs.filter(function(log) { return log.type === "food"; });
 
      if (foodLogs.length === 0) {
        sharedText = "📋 No nutrition logs recorded yet.";
      } else {
        const foodSummary = foodLogs.map(function(log) {
          const mealName = log.foodName || log.description || log.name || "Meal Item";
          return mealName + " (" + log.calories + " kcal)";
        }).join(", ");
        
        const totalCal = foodLogs.reduce(function(total, log) { return total + Number(log.calories); }, 0);
        sharedText = "🥗 Today's Nutrition: " + foodSummary + " — Total: " + totalCal + " kcal";
      }
 
    } else if (logType === "Workout log") {
      const activityLogs = logs.filter(function(log) { return log.type === "activity"; });
 
      if (activityLogs.length === 0) {
        sharedText = "📋 No workout logs recorded yet.";
      } else {
        const activitySummary = activityLogs.map(function(log) {
          const workoutName = log.exercise || log.description || log.name || "Workout";
          return workoutName + " (" + log.calories + " kcal burned)";
        }).join(", ");
        
        sharedText = "🏋️ Workout Log: " + activitySummary;
      }
 
    } else if (logType === "Weekly Progress") {
      const totalConsumed = logs
        .filter(function(log) { return log.type === "food"; })
        .reduce(function(total, log) { return total + Number(log.calories); }, 0);
      const totalBurned = logs
        .filter(function(log) { return log.type === "activity"; })
        .reduce(function(total, log) { return total + Number(log.calories); }, 0);
      const net = totalConsumed - totalBurned;
      
      sharedText = "📊 Weekly Progress — Consumed: " + totalConsumed + " kcal | Burned: " + totalBurned + " kcal | Net: " + net + " kcal";
    }

    if (sharedText !== "") {
      const sharedMsg = {
        id: messages.length + 1,
        sender: "You",
        text: sharedText,
        type: "sent"
      };
      
      // setMessages([...messages, sharedMsg]);
      onSendMessage(sharedMsg);
    }
  }

  return (
    <main>
      <section className="page-intro">
        <h1>{squadName}</h1>
        <p>
          Connect with others and share your progress, tips and motivation to
          stay on track with your fitness goals.
        </p>
      </section>

      <div className="community-grid-layout">
        <ChatSection
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          handleShareButtonClick={handleShareButtonClick}
        />
      </div>
    </main>
  );
}