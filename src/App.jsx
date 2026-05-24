import DashboardPage from "./pages/DashboardPage";
import PlanPage from "./pages/PlanPage";
import NutritionForm from "./components/NutritionForm";
import CommunityPage from "./components/CommunityPage";

export default function App() {
  return (
    <>
      <DashboardPage />
      <PlanPage />
      <NutritionForm />
      <CommunityPage />
    </>
  );
}
