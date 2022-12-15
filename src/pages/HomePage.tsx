import { useAuth } from "../hooks/useAuth";
import { UnauthenticatedPage } from "./UnauthenticatedPage";
import { DashboardPage } from "./DashboardPage";
import { Loading } from "../components/Loading";

export function HomePage() {
  const { user } = useAuth();

  if (typeof user == "undefined") return <Loading />;

  if (user) return <DashboardPage />;

  return <UnauthenticatedPage />;
}
