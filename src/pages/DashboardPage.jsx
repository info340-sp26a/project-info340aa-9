import { useMemo, useState } from "react";
import DashboardFilter from "../components/DashboardFilter";
import DashboardWelcome from "../components/DashboardWelcome";
import DashboardSummary from "../components/DashboardSummary";
import DashboardPlan from "../components/DashboardPlan";

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
    const latestDate = parseDateKey(calorieHistory[calorieHistory.length - 1].date);
    const cutoff = new Date(latestDate);
    cutoff.setDate(latestDate.getDate() - (daysToInclude - 1));

    return calorieHistory.filter((entry) => parseDateKey(entry.date) >= cutoff);
  }, [calorieHistory, period]);

  const availableDates = useMemo(
    () => new Set(filteredHistory.map((entry) => entry.date)),
    [filteredHistory]
  );
  const dateMin = filteredHistory[0]?.date ?? "";
  const dateMax = filteredHistory[filteredHistory.length - 1]?.date ?? "";

  const [selectedDate, setSelectedDate] = useState("");
  const activeSelectedDate = availableDates.has(selectedDate) ? selectedDate : dateMax;
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
          dateMin={dateMin}
          dateMax={dateMax}
          metricQuery={metricQuery}
          onMetricQueryChange={setMetricQuery}
        />
        <DashboardSummary user={user} metricQuery={metricQuery} summaryTitle={summaryTitle} />
        <DashboardPlan />
      </main>
    </div>
  );
}

export default DashboardPage;
