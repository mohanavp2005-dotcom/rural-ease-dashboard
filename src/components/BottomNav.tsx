import { LayoutDashboard, ShoppingCart, Package, Wallet, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const items = [
  { key: "dashboard", to: "/dashboard", icon: LayoutDashboard },
  { key: "sales", to: "/sales", icon: ShoppingCart },
  { key: "inventory", to: "/inventory", icon: Package },
  { key: "expenses", to: "/expenses", icon: Wallet },
  { key: "settings", to: "/settings", icon: Settings },
];

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{t(item.key)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
