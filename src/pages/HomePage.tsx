import { useAuth } from "../hooks/useAuth";
import { DashboardPage } from "./DashboardPage";
import { LogInPage } from "./LogInPage";

export function HomePage() {
  const { user } = useAuth();

  if (user) return <DashboardPage />;

  return <LogInPage />;
}
