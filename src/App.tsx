import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { BusinessProvider } from "@/contexts/BusinessContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerStore from "./pages/CustomerStore";
import CustomerOrders from "./pages/CustomerOrders";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import OnlineStore from "./pages/OnlineStore";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/SettingsPage";
import OwnerOrders from "./pages/OwnerOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <BusinessProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                {/* Owner auth */}
                <Route path="/login" element={<OwnerLogin />} />
                <Route path="/register" element={<OwnerRegister />} />
                {/* Customer auth */}
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route path="/customer/register" element={<CustomerRegister />} />
                {/* Customer protected routes */}
                <Route element={<ProtectedRoute requiredRole="customer" />}>
                  <Route path="/customer" element={<CustomerDashboard />} />
                  <Route path="/customer/store/:storeCode" element={<CustomerStore />} />
                  <Route path="/customer/orders" element={<CustomerOrders />} />
                </Route>
                {/* Owner protected routes */}
                <Route element={<ProtectedRoute requiredRole="owner" />}>
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/store" element={<OnlineStore />} />
                    <Route path="/orders" element={<OwnerOrders />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BusinessProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
