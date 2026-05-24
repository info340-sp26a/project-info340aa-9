import DashboardFilter from "../components/DashboardFilter";
import DashboardWelcome from "../components/DashboardWelcome";
import DashboardGrid from "../components/DashboardGrid";
function DashboardPage() {
  return (
    <div className="main-dashboard">
      <main>
        <DashboardWelcome />
        <DashboardFilter />
        <DashboardGrid />
      </main>
    </div>
  );
}

export default DashboardPage;
