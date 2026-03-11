import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ requiredRole }: { requiredRole?: "owner" | "customer" }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!user) {
    return <Navigate to={requiredRole === "customer" ? "/customer/login" : "/login"} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to={profile?.role === "customer" ? "/customer" : "/dashboard"} replace />;
  }

  return <Outlet />;
}
