import { IndianRupee, Wallet, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { BusinessSpecificWidgets } from "@/components/BusinessWidgets";

const weeklyData = [
  { day: "Mon", sales: 2400 }, { day: "Tue", sales: 1800 }, { day: "Wed", sales: 3200 },
  { day: "Thu", sales: 2800 }, { day: "Fri", sales: 3600 }, { day: "Sat", sales: 4100 },
  { day: "Sun", sales: 2900 },
];

const monthlyProfit = [
  { month: "Jan", profit: 12000 }, { month: "Feb", profit: 15000 }, { month: "Mar", profit: 18000 },
  { month: "Apr", profit: 14000 }, { month: "May", profit: 22000 }, { month: "Jun", profit: 19000 },
];

const Dashboard = () => {
  const { t } = useLanguage();
  const { businessType } = useBusiness();

  const stats = [
    { label: t("todays_sales"), value: "₹4,250", icon: IndianRupee, color: "text-success" },
    { label: t("todays_expenses"), value: "₹1,800", icon: Wallet, color: "text-destructive" },
    { label: t("monthly_profit"), value: "₹42,500", icon: TrendingUp, color: "text-primary" },
    { label: t("low_stock"), value: "3", icon: AlertTriangle, color: "text-warning" },
    { label: t("pending_orders"), value: "5", icon: Clock, color: "text-info" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="page-header">{t("dashboard")}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="stat-card flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-muted ${s.color} shrink-0`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{s.label}</p>
              <p className="text-lg font-bold leading-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <BusinessSpecificWidgets businessType={businessType} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold text-lg mb-4">{t("weekly_sales")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-lg mb-4">{t("monthly_profit")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyProfit}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
