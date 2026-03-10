import { AlertTriangle, Clock, BarChart3, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBusiness } from "@/contexts/BusinessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { notificationsByBusiness } from "@/data/businessData";

const iconMap: Record<string, React.ElementType> = {
  stock: AlertTriangle,
  payment: Clock,
  sales: BarChart3,
  scheme: Megaphone,
};

const colorMap: Record<string, string> = {
  stock: "text-warning",
  payment: "text-destructive",
  sales: "text-primary",
  scheme: "text-info",
};

const Notifications = () => {
  const { businessType } = useBusiness();
  const { t } = useLanguage();
  const notifications = notificationsByBusiness[businessType];

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="page-header">{t("notifications")}</h1>
      <div className="space-y-3">
        {notifications.map((n, i) => {
          const Icon = iconMap[n.type] || BarChart3;
          const color = colorMap[n.type] || "text-primary";
          return (
            <div key={i} className="stat-card flex items-start gap-4">
              <div className={`p-2.5 rounded-xl bg-muted ${color} shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">{n.title}</p>
                  <Badge variant="secondary" className="text-xs">{n.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
