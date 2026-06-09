import { useState, useEffect } from "react";
import DashboardFilter from "../components/DashboardFilter";
import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import DashboardPlan from "../components/DashboardPlan";

import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateLabel(dateKey) {
  return parseDateKey(dateKey).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fillCalorieInfo(calorieInfo) {
  const remaining = calorieInfo.target - calorieInfo.intake;
  const percentage =
    calorieInfo.target > 0
      ? Math.round((calorieInfo.intake / calorieInfo.target) * 100)
      : 0;

  return {
    ...calorieInfo,
    remaining,
    percentage,
  };
}

function DashboardPage() {
  const userProfile = {
    name: "Larissa",
    calorieTarget: 2500,
  };

  const [period, setPeriod] = useState("week");
  const [logs, setLogs] = useState([]);
  const [metricQuery, setMetricQuery] = useState("");
  const [calorieHistory, setCalorieHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const logsRef = ref(database, "logs");
    onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLogs(Object.values(data));
      }
    });

    const historyRef = ref(database, "calorieHistory");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyArray = Object.entries(data).map(
          ([date, calorieInfo]) => ({
            date,
            calorieInfo,
          }),
        );

        historyArray.sort(
          (a, b) => parseDateKey(a.date) - parseDateKey(b.date),
        );

        setCalorieHistory(historyArray);
      }
    });
  }, []);

  let streak = 0;
  if (calorieHistory.length > 0) {
    const sortedHistory = [...calorieHistory].sort(
      (a, b) => parseDateKey(b.date) - parseDateKey(a.date),
    );

    const today = new Date();
    const todayKeyStr = toDateKey(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKeyStr = toDateKey(yesterday);

    let startIndex = sortedHistory.findIndex(
      (entry) => entry.date === todayKeyStr,
    );
    if (startIndex === -1) {
      startIndex = sortedHistory.findIndex(
        (entry) => entry.date === yesterdayKeyStr,
      );
    }

    if (startIndex !== -1) {
      let expectedDate = parseDateKey(sortedHistory[startIndex].date);

      for (let i = startIndex; i < sortedHistory.length; i++) {
        const entry = sortedHistory[i];
        const entryDate = parseDateKey(entry.date);

        if (entryDate.getTime() === expectedDate.getTime()) {
          if (entry.calorieInfo.intake >= entry.calorieInfo.target) {
            streak++;
            expectedDate.setDate(expectedDate.getDate() - 1);
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
  }

  let filteredHistory = [];
  let dateMin = "";
  let dateMax = "";

  if (calorieHistory.length > 0) {
    const daysByPeriod = { today: 1, week: 7, month: 30, year: 365 };
    const daysToInclude = daysByPeriod[period] ?? 7;

    const latestDate = parseDateKey(
      calorieHistory[calorieHistory.length - 1].date,
    );
    const cutoff = new Date(latestDate);
    cutoff.setDate(latestDate.getDate() - (daysToInclude - 1));

    filteredHistory = calorieHistory.filter(
      (entry) => parseDateKey(entry.date) >= cutoff,
    );

    if (filteredHistory.length > 0) {
      dateMin = filteredHistory[0].date;
      dateMax = filteredHistory[filteredHistory.length - 1].date;
    }
  }

  let activeSelectedDate = "";
  const isValidDate = filteredHistory.some(
    (entry) => entry.date === selectedDate,
  );
  if (isValidDate) {
    activeSelectedDate = selectedDate;
  } else if (filteredHistory.length > 0) {
    activeSelectedDate = filteredHistory[filteredHistory.length - 1].date;
  }

  const foodLogs = logs.filter((log) => log.type === "food");
  const activityLogs = logs.filter((log) => log.type === "activity");

  const totalCaloriesConsumed = foodLogs.reduce((total, log) => {
    return total + Number(log.calories);
  }, 0);

  const totalCaloriesBurned = activityLogs.reduce((total, log) => {
    return total + Number(log.calories);
  }, 0);

  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

  const todayKey = toDateKey(new Date());

  const summaryTitle = activeSelectedDate
    ? activeSelectedDate === todayKey
      ? "Daily Summary for Today"
      : `Daily Summary for ${formatDateLabel(activeSelectedDate)}`
    : "Daily Summary";

  const selectedEntry =
    filteredHistory.find((entry) => entry.date === activeSelectedDate) ??
    filteredHistory[filteredHistory.length - 1];

  const user = {
    name: userProfile.name,
    calorieInfo: fillCalorieInfo(
      selectedEntry?.calorieInfo ?? {
        target: userProfile.calorieTarget,
        intake: 0,
        burned: 0,
      },
    ),
  };

  return (
    <div className="main-dashboard">
      <main>
        <DashboardWelcome user={user} streak={streak} />
        <DashboardFilter
          period={period}
          onPeriodChange={(newPeriod) => {
            setPeriod(newPeriod);
            setSelectedDate("");
          }}
          selectedDate={activeSelectedDate}
          onDateChange={setSelectedDate}
          dateMin={dateMin}
          dateMax={dateMax}
          metricQuery={metricQuery}
          onMetricQueryChange={setMetricQuery}
        />
        <DashboardSummary
          user={user}
          metricQuery={metricQuery}
          summaryTitle={summaryTitle}
        />
        <DashboardPlan netCalories={netCalories} />
      </main>
    </div>
  );
}

export default DashboardPage;
