import DashboardFilter from "../components/DashboardFilter";
import DashboardWelcome from "../components/DashboardWelcome";
import DashboardGrid from "../components/DashboardGrid";
function DashboardPage() {
  const calorieInfo = {target:2500, intake:2100, burned:600, remaining: null, percentage: null}
  const user = {name: "Larissa", calorieInfo: calorieInfo};
  const remaining = user.calorieInfo.target - user.calorieInfo.intake;
  const percentage = (user.calorieInfo.intake / user.calorieInfo.target) * 100;
  user.calorieInfo.remaining = remaining;
  user.calorieInfo.percentage = percentage;
  return (
    <div className="main-dashboard">
      <main>
        <DashboardWelcome user={user} />
        <DashboardFilter />
        <DashboardGrid user={user} />
      </main>
    </div>
  );
}

export default DashboardPage;
