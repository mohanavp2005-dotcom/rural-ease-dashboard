import { Navigate, Outlet } from "react-router-dom";
import { useBusiness } from "@/contexts/BusinessContext";

export function ProtectedRoute() {
  const { isLoggedIn } = useBusiness();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
