import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Bell, Sprout, LogOut, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export function AppLayout() {
  const { business, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const copyStoreLink = () => {
    if (business?.store_code) {
      const link = `${window.location.origin}/customer/store/${business.store_code}`;
      navigator.clipboard.writeText(link);
      toast({ title: "Store link copied! 📋", description: "Share this with your customers" });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <div className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg truncate">{business?.name || "RuralBiz"}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {business?.store_code && (
                <Button variant="ghost" size="sm" onClick={copyStoreLink} title="Copy store link">
                  <Copy className="h-4 w-4 mr-1" /> Share Store
                </Button>
              )}
              <Button variant="ghost" size="icon" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title={t("logout") || "Logout"}>
                <LogOut className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
            <Outlet />
          </main>
        </div>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
