import { AlertTriangle, Clock, BarChart3, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { type: "stock", icon: AlertTriangle, color: "text-warning", title: "Low Stock: Ghee", desc: "Only 3 liters remaining. Restock soon.", time: "10 min ago" },
  { type: "stock", icon: AlertTriangle, color: "text-warning", title: "Low Stock: Paneer", desc: "Only 5 kg remaining. Below minimum threshold.", time: "1 hour ago" },
  { type: "payment", icon: Clock, color: "text-destructive", title: "Payment Pending: Lakshmi Store", desc: "₹640 due for Paneer order. Due today.", time: "2 hours ago" },
  { type: "payment", icon: Clock, color: "text-destructive", title: "Payment Pending: Selva", desc: "₹600 due for Ghee order. Overdue by 2 days.", time: "2 days ago" },
  { type: "sales", icon: BarChart3, color: "text-primary", title: "Daily Sales Summary", desc: "Today's total: ₹4,250 from 8 orders. Top seller: Fresh Milk.", time: "Today" },
  { type: "scheme", icon: Megaphone, color: "text-info", title: "Govt Scheme: PM-KISAN", desc: "New installment of ₹2,000 available. Apply before March 31.", time: "1 day ago" },
  { type: "scheme", icon: Megaphone, color: "text-info", title: "Subsidy: Dairy Equipment", desc: "50% subsidy on milk processing equipment. Check eligibility.", time: "3 days ago" },
];

const Notifications = () => (
  <div className="animate-fade-in space-y-6">
    <h1 className="page-header">Notifications</h1>
    <div className="space-y-3">
      {notifications.map((n, i) => (
        <div key={i} className="stat-card flex items-start gap-4">
          <div className={`p-2.5 rounded-xl bg-muted ${n.color} shrink-0`}>
            <n.icon className="h-5 w-5" />
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
      ))}
    </div>
  </div>
);

export default Notifications;
