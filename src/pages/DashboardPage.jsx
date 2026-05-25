import { useMemo, useState } from "react";
import DashboardFilter from "../components/DashboardFilter";
import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import DashboardPlan from "../components/DashboardPlan";

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(dateKey) {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function generateCalorieHistory(days, targetCalories) {
  const today = new Date();
  const target = targetCalories;

  return Array.from({ length: days }, (_, index) => {
    const entryDate = new Date(today);
    entryDate.setDate(today.getDate() - (days - index - 1));

    const intake = Math.round(target * (0.6 + Math.random() * 0.6));
    const burned = Math.round(target * (0.1 + Math.random() * 0.25));

    return {
      date: toDateKey(entryDate),
      calorieInfo: {
        target,
        intake,
        burned,
      },
    };
  });
}

function enrichCalorieInfo(calorieInfo) {
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
  const [metricQuery, setMetricQuery] = useState("");
  const calorieHistory = useMemo(
    () => generateCalorieHistory(120, userProfile.calorieTarget),
    [userProfile.calorieTarget]
  );

  const filteredHistory = useMemo(() => {
    if (calorieHistory.length === 0) {
      return [];
    }

    const daysByPeriod = {
      today: 1,
      week: 7,
      month: 30,
      year: 365,
    };
    const daysToInclude = daysByPeriod[period] ?? 7;
    const latestDate = new Date(`${calorieHistory[calorieHistory.length - 1].date}T00:00:00`);
    const cutoff = new Date(latestDate);
    cutoff.setDate(latestDate.getDate() - (daysToInclude - 1));

    return calorieHistory.filter((entry) => new Date(`${entry.date}T00:00:00`) >= cutoff);
  }, [calorieHistory, period]);

  const dateOptions = useMemo(
    () =>
      [...filteredHistory]
        .reverse()
        .map((entry) => ({ value: entry.date, label: formatDateLabel(entry.date) })),
    [filteredHistory]
  );

  const [selectedDate, setSelectedDate] = useState("");
  const activeSelectedDate = dateOptions.some((option) => option.value === selectedDate)
    ? selectedDate
    : (dateOptions[0]?.value ?? "");

  const selectedEntry =
    filteredHistory.find((entry) => entry.date === activeSelectedDate) ??
    filteredHistory[filteredHistory.length - 1];

  const user = {
    name: userProfile.name,
    calorieInfo: enrichCalorieInfo(
      selectedEntry?.calorieInfo ?? {
        target: userProfile.calorieTarget,
        intake: 0,
        burned: 0,
      }
    ),
  };

  return (
    <div className="main-dashboard">
      <main>
        <DashboardWelcome user={user} />
        <DashboardFilter
          period={period}
          onPeriodChange={setPeriod}
          selectedDate={activeSelectedDate}
          onDateChange={setSelectedDate}
          dateOptions={dateOptions}
          metricQuery={metricQuery}
          onMetricQueryChange={setMetricQuery}
        />
        <DashboardSummary user={user} metricQuery={metricQuery} />
        <DashboardPlan />
      </main>
    </div>
  );
}

export default DashboardPage;
