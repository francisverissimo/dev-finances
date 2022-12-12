import { useAuth } from "../hooks/useAuth";
import { DashboardPage } from "./DashboardPage";
import { LogInPage } from "./LogInPage";
import { Loading } from "../components/Loading";

export function HomePage() {
  const { user } = useAuth();

  if (typeof user == "undefined") return <Loading />;

  if (user) return <DashboardPage />;

  // unauthenticatedUser
  return <LogInPage />;
}
